// Airtable integration for AIHUB-STATION

// This file will be used to connect to Airtable and handle form submissions
// The actual API key and base ID will be provided by the user later

// Airtable configuration (to be filled with actual credentials)
const AIRTABLE_CONFIG = {
    apiKey: "YOUR_AIRTABLE_API_KEY", // Will be replaced with actual API key
    baseId: "YOUR_AIRTABLE_BASE_ID", // Will be replaced with actual base ID
    userTableName: "Users",
    communityTableName: "Community",
    eventsTableName: "Events"
};

let airtableClient = null;

// Function to initialize Airtable connection
function initAirtable(apiKey, baseId) {
    // Update config with provided credentials
    if (apiKey && baseId) {
        AIRTABLE_CONFIG.apiKey = apiKey;
        AIRTABLE_CONFIG.baseId = baseId;
    }
    
    // Initialize Airtable client
    airtableClient = new AirtableAPI(AIRTABLE_CONFIG.apiKey, AIRTABLE_CONFIG.baseId);
    console.log("Airtable connection initialized");
    
    // Add event listeners to forms for Airtable submission
    setupFormSubmissions();
    
    // Load events from Airtable
    loadEvents();
    
    return airtableClient;
}

// Function to set up form submissions to Airtable
function setupFormSubmissions() {
    const userForm = document.getElementById('user-form');
    const communityForm = document.getElementById('community-form');
    
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const role = document.getElementById('role').value;
            const city = document.getElementById('city').value;
            const ageGroup = document.getElementById('age-group').value;
            
            if (!name || !email || !phone || !role || !city || !ageGroup) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Phone validation
            const phoneRegex = /^\d{10,15}$/;
            if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
                alert('Please enter a valid phone number');
                return;
            }
            
            // Prepare data for Airtable submission
            const userData = {
                Name: name,
                Email: email,
                Phone: phone,
                Role: role,
                City: city,
                "Age Group": ageGroup,
                Timestamp: new Date().toISOString()
            };
            
            // Submit to Airtable
            submitToAirtable(AIRTABLE_CONFIG.userTableName, userData)
                .then(response => {
                    // Show success message
                    alert('Registration successful! Welcome to AIHUB-STATION.');
                    
                    // Close modal and reset form
                    const loginModal = document.getElementById('login-modal');
                    loginModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    userForm.reset();
                })
                .catch(error => {
                    console.error('Error submitting to Airtable:', error);
                    alert('There was an error processing your registration. Please try again later.');
                });
        });
    }
    
    if (communityForm) {
        communityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('comm-name').value;
            const email = document.getElementById('comm-email').value;
            const category = document.getElementById('category').value;
            const interest = document.getElementById('interest').value;
            
            if (!name || !email || !category || !interest) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Prepare data for Airtable submission
            const communityData = {
                Name: name,
                Email: email,
                Category: category,
                Interest: interest,
                Timestamp: new Date().toISOString()
            };
            
            // Submit to Airtable
            submitToAirtable(AIRTABLE_CONFIG.communityTableName, communityData)
                .then(response => {
                    // Show success message
                    alert('Thank you for joining our community! We will be in touch soon.');
                    
                    // Close modal and reset form
                    const communityModal = document.getElementById('community-modal');
                    communityModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    communityForm.reset();
                })
                .catch(error => {
                    console.error('Error submitting to Airtable:', error);
                    alert('There was an error processing your request. Please try again later.');
                });
        });
    }
}

// Function to submit data to Airtable
async function submitToAirtable(tableName, data) {
    if (!airtableClient) {
        // If Airtable client is not initialized, store in localStorage
        console.log(`Airtable client not initialized. Storing in localStorage:`, data);
        const storageKey = tableName === AIRTABLE_CONFIG.userTableName ? 'userData' : 'communityData';
        localStorage.setItem(storageKey, JSON.stringify(data));
        return { success: true, id: 'local_' + Math.random().toString(36).substring(2, 10) };
    }
    
    try {
        // Submit to Airtable using the API wrapper
        const response = await airtableClient.createRecord(tableName, data);
        console.log(`Successfully submitted to Airtable table ${tableName}:`, response);
        return response;
    } catch (error) {
        console.error(`Error submitting to Airtable table ${tableName}:`, error);
        throw error;
    }
}

// Function to load events from Airtable
async function loadEvents() {
    const eventsGrid = document.querySelector('.events-grid');
    if (!eventsGrid) return;
    
    try {
        const events = await fetchEventsFromAirtable();
        
        // Clear existing events
        eventsGrid.innerHTML = '';
        
        // Create event cards
        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-card-content">
                    <h3>${event.title}</h3>
                    <p class="event-date">${event.date} | ${event.speaker}</p>
                    <p>${event.description}</p>
                    <a href="${event.registerLink}" class="btn btn-primary">Register Now</a>
                </div>
            `;
            eventsGrid.appendChild(eventCard);
        });
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

// Function to fetch events from Airtable
async function fetchEventsFromAirtable() {
    if (!airtableClient) {
        // Return mock data if Airtable client is not initialized
        return [
            {
                title: 'Introduction to AI Agents',
                date: 'April 15, 2025',
                speaker: 'Dr. Sarah Johnson',
                description: 'Learn the basics of AI agents and how they can transform your workflow.',
                registerLink: '#'
            },
            {
                title: 'Building with n8n Workshop',
                date: 'April 22, 2025',
                speaker: 'Michael Chen',
                description: 'Hands-on workshop to create your first automation workflow with n8n.',
                registerLink: '#'
            },
            {
                title: 'AI Integration Masterclass',
                date: 'May 5, 2025',
                speaker: 'Priya Patel',
                description: 'Advanced techniques for integrating AI into your existing systems.',
                registerLink: '#'
            }
        ];
    }
    
    try {
        // Fetch events from Airtable
        const response = await airtableClient.getRecords(AIRTABLE_CONFIG.eventsTableName, {
            sort: [{ field: 'Date', direction: 'asc' }]
        });
        
        // Map Airtable response to event objects
        return response.records.map(record => ({
            title: record.fields.Title,
            date: record.fields.Date,
            speaker: record.fields.Speaker,
            description: record.fields.Description,
            registerLink: record.fields.RegisterLink || '#'
        }));
    } catch (error) {
        console.error('Error fetching events from Airtable:', error);
        throw error;
    }
}

// Export functions for use in main.js
window.airtableIntegration = {
    init: initAirtable,
    submitToAirtable: submitToAirtable,
    fetchEvents: fetchEventsFromAirtable
};
