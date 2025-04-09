// EmailJS integration for AIHUB-STATION

// EmailJS configuration
const EMAILJS_CONFIG = {
    serviceId: "service_60v97r6", // Will be replaced with actual service ID
    templateId: "template_a96jdzp", // Will be replaced with actual template ID
    userId: "qMka_r0yybWxrIwJG", // EmailJS API Key from knowledge items
    contactFormTemplateId: "template_a96jdzp" // Will be replaced with actual template ID
};

// Function to initialize EmailJS
function initEmailJS() {
    // Initialize EmailJS with user ID
    emailjs.init(EMAILJS_CONFIG.userId);
    console.log("EmailJS initialized");
    
    // Add event listeners for form submissions
    setupEmailNotifications();
}

// Function to set up email notifications for form submissions
function setupEmailNotifications() {
    const userForm = document.getElementById('user-form');
    const communityForm = document.getElementById('community-form');
    
    if (userForm) {
        const originalSubmit = userForm.onsubmit;
        userForm.onsubmit = async function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const role = document.getElementById('role').value;
            const city = document.getElementById('city').value;
            const ageGroup = document.getElementById('age-group').value;
            
            // Basic validation (already handled in main form submission)
            if (!name || !email || !phone || !role || !city || !ageGroup) {
                return;
            }
            
            try {
                // Send email notification
                await sendEmailNotification('signup', {
                    name,
                    email,
                    phone,
                    role,
                    city,
                    ageGroup,
                    formType: 'User Registration'
                });
                
                console.log('Email notification sent for user registration');
                
                // Continue with original form submission
                if (originalSubmit) {
                    originalSubmit.call(this, e);
                }
            } catch (error) {
                console.error('Error sending email notification:', error);
                // Continue with original form submission even if email fails
                if (originalSubmit) {
                    originalSubmit.call(this, e);
                }
            }
        };
    }
    
    if (communityForm) {
        const originalSubmit = communityForm.onsubmit;
        communityForm.onsubmit = async function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('comm-name').value;
            const email = document.getElementById('comm-email').value;
            const category = document.getElementById('category').value;
            const interest = document.getElementById('interest').value;
            
            // Basic validation (already handled in main form submission)
            if (!name || !email || !category || !interest) {
                return;
            }
            
            try {
                // Send email notification
                await sendEmailNotification('community', {
                    name,
                    email,
                    category,
                    interest,
                    formType: 'Community Join'
                });
                
                console.log('Email notification sent for community join');
                
                // Continue with original form submission
                if (originalSubmit) {
                    originalSubmit.call(this, e);
                }
            } catch (error) {
                console.error('Error sending email notification:', error);
                // Continue with original form submission even if email fails
                if (originalSubmit) {
                    originalSubmit.call(this, e);
                }
            }
        };
    }
}

// Function to send email notification
async function sendEmailNotification(type, data) {
    // Prepare template parameters based on form type
    const templateParams = {
        to_email: 'admin@aihub-station.com', // Replace with actual admin email
        from_name: data.name,
        from_email: data.email,
        subject: `New ${data.formType} Submission`,
        message: formatEmailMessage(type, data)
    };
    
    // Select template ID based on form type
    const templateId = type === 'signup' ? 
        EMAILJS_CONFIG.templateId : 
        EMAILJS_CONFIG.contactFormTemplateId;
    
    try {
        // Send email using EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            templateId,
            templateParams
        );
        
        console.log('Email sent successfully:', response);
        return response;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// Function to format email message based on form type
function formatEmailMessage(type, data) {
    if (type === 'signup') {
        return `
            New user registration:
            
            Name: ${data.name}
            Email: ${data.email}
            Phone: ${data.phone}
            Role: ${data.role}
            City: ${data.city}
            Age Group: ${data.ageGroup}
            
            Timestamp: ${new Date().toLocaleString()}
        `;
    } else if (type === 'community') {
        return `
            New community join request:
            
            Name: ${data.name}
            Email: ${data.email}
            Category: ${data.category}
            Interest: ${data.interest}
            
            Timestamp: ${new Date().toLocaleString()}
        `;
    }
    
    return '';
}

// Export functions for use in main.js
window.emailJSIntegration = {
    init: initEmailJS,
    sendNotification: sendEmailNotification
};
