// Community and Events sections implementation for AIHUB-STATION

document.addEventListener('DOMContentLoaded', function() {
    // Populate community members section (placeholder data)
    createCommunityMembers();
    
    // Load events from Airtable or use placeholder data
    loadEvents();
});

// Function to create community members
function createCommunityMembers() {
    // This would typically fetch from Airtable, but we'll use placeholder data for now
    const communityMembers = [
        {
            name: 'Alex Johnson',
            role: 'AI Developer',
            image: 'images/placeholder-logo.svg',
            bio: 'Specializes in building autonomous agents with OpenAI and n8n integrations.'
        },
        {
            name: 'Maria Garcia',
            role: 'Automation Expert',
            image: 'images/placeholder-logo.svg',
            bio: 'Creates complex workflow automations using no-code tools and AI agents.'
        },
        {
            name: 'David Kim',
            role: 'Student Developer',
            image: 'images/placeholder-logo.svg',
            bio: 'Learning to build AI solutions while studying computer science.'
        },
        {
            name: 'Priya Patel',
            role: 'Integration Specialist',
            image: 'images/placeholder-logo.svg',
            bio: 'Expert in connecting various platforms through APIs and webhooks.'
        }
    ];
    
    // Create community members section if it doesn't exist
    if (!document.getElementById('members')) {
        const membersSection = document.createElement('section');
        membersSection.id = 'members';
        membersSection.className = 'members';
        
        const container = document.createElement('div');
        container.className = 'container';
        
        const heading = document.createElement('h2');
        heading.textContent = 'Community Members';
        
        const membersGrid = document.createElement('div');
        membersGrid.className = 'members-grid';
        
        container.appendChild(heading);
        container.appendChild(membersGrid);
        membersSection.appendChild(container);
        
        // Insert after join-community section
        const joinCommunitySection = document.getElementById('join-community');
        joinCommunitySection.parentNode.insertBefore(membersSection, joinCommunitySection.nextSibling);
        
        // Add members to the grid
        communityMembers.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card';
            memberCard.innerHTML = `
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p class="member-role">${member.role}</p>
                <p>${member.bio}</p>
            `;
            membersGrid.appendChild(memberCard);
        });
    }
}

// Function to load events
function loadEvents() {
    const eventsGrid = document.querySelector('.events-grid');
    if (!eventsGrid) return;
    
    // This would typically fetch from Airtable, but we'll use placeholder data if not available
    if (window.airtableIntegration && typeof window.airtableIntegration.fetchEvents === 'function') {
        window.airtableIntegration.fetchEvents()
            .then(events => {
                populateEvents(events, eventsGrid);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
                // Use placeholder data as fallback
                const placeholderEvents = getPlaceholderEvents();
                populateEvents(placeholderEvents, eventsGrid);
            });
    } else {
        // Use placeholder data
        const placeholderEvents = getPlaceholderEvents();
        populateEvents(placeholderEvents, eventsGrid);
    }
}

// Function to get placeholder events
function getPlaceholderEvents() {
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
        },
        {
            title: 'No-Code AI Development',
            date: 'May 12, 2025',
            speaker: 'James Wilson',
            description: 'Build powerful AI applications without writing a single line of code.',
            registerLink: '#'
        }
    ];
}

// Function to populate events
function populateEvents(events, eventsGrid) {
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
}

// Add experts section
function createExpertsSection() {
    const experts = [
        {
            name: 'Dr. Emily Chen',
            specialty: 'AI Research',
            image: 'images/placeholder-logo.svg',
            bio: 'Leading researcher in autonomous agent development with multiple published papers.'
        },
        {
            name: 'Robert Williams',
            specialty: 'Integration Architecture',
            image: 'images/placeholder-logo.svg',
            bio: 'Designs complex integration systems for enterprise clients using AI agents.'
        },
        {
            name: 'Sophia Rodriguez',
            specialty: 'No-Code Development',
            image: 'images/placeholder-logo.svg',
            bio: 'Teaches beginners how to build powerful applications without coding experience.'
        }
    ];
    
    // Create experts section if it doesn't exist
    if (!document.getElementById('experts')) {
        const expertsSection = document.createElement('section');
        expertsSection.id = 'experts';
        expertsSection.className = 'experts';
        
        const container = document.createElement('div');
        container.className = 'container';
        
        const heading = document.createElement('h2');
        heading.textContent = 'Our Experts';
        
        const expertsGrid = document.createElement('div');
        expertsGrid.className = 'experts-grid';
        
        container.appendChild(heading);
        container.appendChild(expertsGrid);
        expertsSection.appendChild(container);
        
        // Insert before events section
        const eventsSection = document.getElementById('events');
        eventsSection.parentNode.insertBefore(expertsSection, eventsSection);
        
        // Add experts to the grid
        experts.forEach(expert => {
            const expertCard = document.createElement('div');
            expertCard.className = 'expert-card';
            expertCard.innerHTML = `
                <img src="${expert.image}" alt="${expert.name}">
                <h3>${expert.name}</h3>
                <p class="expert-specialty">${expert.specialty}</p>
                <p>${expert.bio}</p>
            `;
            expertsGrid.appendChild(expertCard);
        });
    }
}

// Initialize community and events sections
createExpertsSection();
