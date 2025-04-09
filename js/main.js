// Main JavaScript for AIHUB-STATION

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    if (window.emailJSIntegration) {
        window.emailJSIntegration.init();
    }
    
    // Initialize Airtable (will be called with actual credentials later)
    if (window.airtableIntegration) {
        // For now, initialize without credentials
        window.airtableIntegration.init();
    }
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Modal functionality
    const loginModal = document.getElementById('login-modal');
    const communityModal = document.getElementById('community-modal');
    const loginBtn = document.querySelector('.btn-login');
    const joinBtn = document.querySelector('.open-form');
    const closeBtns = document.querySelectorAll('.close');
    
    // Open login modal
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Open community modal
    if (joinBtn && communityModal) {
        joinBtn.addEventListener('click', function() {
            communityModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            communityModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === communityModal) {
            communityModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form validation and submission
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
            
            // Prepare data for submission
            const userData = {
                name,
                email,
                phone,
                role,
                city,
                ageGroup,
                timestamp: new Date().toISOString()
            };
            
            // Store in localStorage temporarily (will be replaced with Airtable)
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Show success message
            alert('Registration successful! Welcome to AIHUB-STATION.');
            
            // Close modal and reset form
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            userForm.reset();
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
            
            // Prepare data for submission
            const communityData = {
                name,
                email,
                category,
                interest,
                timestamp: new Date().toISOString()
            };
            
            // Store in localStorage temporarily (will be replaced with Airtable)
            localStorage.setItem('communityData', JSON.stringify(communityData));
            
            // Show success message
            alert('Thank you for joining our community! We will be in touch soon.');
            
            // Close modal and reset form
            communityModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            communityForm.reset();
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(15, 32, 39, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 32, 39, 0.9)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Populate features section
    const featuresGrid = document.querySelector('.features-grid');
    if (featuresGrid) {
        const features = [
            {
                name: 'n8n',
                description: 'Visual Automation Builder',
                icon: 'images/n8n-logo.png'
            },
            {
                name: 'Copilot Studio',
                description: 'Microsoft Workflow & Chatbot Automation',
                icon: 'images/copilot-logo.png'
            },
            {
                name: 'OpenAI GPT',
                description: 'Smart Agent + Content Creation',
                icon: 'images/openai-logo.png'
            },
            {
                name: 'Claude 3.5',
                description: 'AI Assistant',
                icon: 'images/claude-logo.png'
            },
            {
                name: 'Airtable',
                description: 'Powerful Spreadsheet as Database',
                icon: 'images/airtable-logo.png'
            },
            {
                name: 'Google Sheets',
                description: 'Real-Time Cloud Data',
                icon: 'images/sheets-logo.png'
            },
            {
                name: 'Telegram Bots',
                description: 'Automation via Chat',
                icon: 'images/telegram-logo.png'
            },
            {
                name: 'Zapier / Make.com',
                description: 'Task Automation',
                icon: 'images/zapier-logo.png'
            },
            {
                name: 'Supabase',
                description: 'Open-source Firebase alternative',
                icon: 'images/supabase-logo.png'
            },
            {
                name: 'Lovable.so',
                description: 'Web app builder',
                icon: 'images/lovable-logo.png'
            }
        ];
        
        // Create feature cards
        features.forEach(feature => {
            const featureCard = document.createElement('div');
            featureCard.className = 'feature-card';
            featureCard.innerHTML = `
                <img src="${feature.icon}" alt="${feature.name} Logo" onerror="this.src='images/placeholder-logo.png'">
                <h3>${feature.name}</h3>
                <p>${feature.description}</p>
            `;
            featuresGrid.appendChild(featureCard);
        });
    }
    
    // Populate events section (placeholder data)
    const eventsGrid = document.querySelector('.events-grid');
    if (eventsGrid) {
        const events = [
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
});
