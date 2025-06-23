document.addEventListener('DOMContentLoaded', function() {
    // ==================== 1. DOM ELEMENTS ====================
    const sections = {
        main: document.getElementById('main-content'),
        submit: document.getElementById('story-submission'),
        vote: document.getElementById('community-voting'),
        boost: document.getElementById('boost-feature')
    };

    const navLinks = {
        home: document.getElementById('home-link'),
        submit: document.getElementById('nav-submit'),
        vote: document.getElementById('nav-vote'),
        boost: document.getElementById('nav-boost')
    };

    const actionButtons = {
        submit: document.getElementById('submit-story-btn'),
        vote: document.getElementById('vote-tales-btn'),
        boost: document.getElementById('boost-story-btn')
    };

    const formElements = {
        submitForm: document.getElementById('story-form'),
        voteButton: document.getElementById('vote-button'),
        boostButton: document.getElementById('boost-button'),
        voteCount: document.getElementById('vote-count')
    };

    const popup = {
        overlay: document.getElementById('popup-overlay'),
        close: document.getElementById('popup-close'),
        btn: document.getElementById('popup-btn'),
        message: document.getElementById('popup-message'),
        icon: document.getElementById('popup-icon'),
        title: document.getElementById('popup-title')
    };

    // ==================== 2. INITIALIZATION ====================
    function initializePage() {
        // Start with main content visible
        showSection('main');
        // Ensure popup is hidden on load
        popup.overlay.classList.add('hidden');
    }

    // ==================== 3. SECTION MANAGEMENT ====================
    function showSection(sectionName) {
        // Hide all sections
        Object.values(sections).forEach(section => {
            section.classList.add('hidden');
        });
        // Show requested section
        sections[sectionName].classList.remove('hidden');
        
        // Special cases
        if (sectionName === 'vote') {
            formElements.voteCount.textContent = '0';
            formElements.voteButton.disabled = false;
        }
    }

    // ==================== 4. POPUP MANAGEMENT ====================
    function showPopup(message, isSuccess = true) {
        popup.icon.className = isSuccess ? 
            'fas fa-check-circle success-icon' : 
            'fas fa-times-circle error-icon';
        popup.title.textContent = isSuccess ? 'Success!' : 'Error!';
        popup.message.innerHTML = message;
        popup.overlay.classList.remove('hidden');
    }

    function closePopup() {
        popup.overlay.classList.add('hidden');
    }

    // ==================== 5. FORM VALIDATION ====================
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const date = document.getElementById('date').value;
        const story = document.getElementById('story').value.trim();

        if (!name || !email || !date || !story) {
            showPopup('❌ Please fill in all fields', false);
            return false;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            showPopup('❌ Please enter a valid email address', false);
            return false;
        }

        return true;
    }

    // ==================== 6. EVENT LISTENERS ====================
    // Navigation
    navLinks.home.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('main');
    });

    navLinks.submit.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('submit');
    });

    navLinks.vote.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('vote');
    });

    navLinks.boost.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('boost');
    });

    // Action buttons
    actionButtons.submit.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('submit');
    });

    actionButtons.vote.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('vote');
    });

    actionButtons.boost.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('boost');
    });

    // Back home buttons
    document.querySelectorAll('[id^="back-home-"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('main');
        });
    });

    // Popup controls
    popup.close.addEventListener('click', closePopup);
    popup.btn.addEventListener('click', closePopup);

    // Form submission
    formElements.submitForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) return;

        // Simulate API call
        setTimeout(() => {
            showPopup('✅ Story submitted!', true);
            formElements.submitForm.reset();
        }, 1000);
    });

    // Voting functionality
    formElements.voteButton.addEventListener('click', function() {
        const email = prompt("Please enter your email to vote:");
        
        if (!email) return;
        
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            showPopup('❌ Please enter a valid email address', false);
            return;
        }
        
        // Simulate voting
        setTimeout(() => {
            showPopup('✅ Thank you for your vote!', true);
            formElements.voteButton.disabled = true;
            const currentCount = parseInt(formElements.voteCount.textContent);
            formElements.voteCount.textContent = currentCount + 1;
        }, 800);
    });

    // Boost functionality
    formElements.boostButton.addEventListener('click', async function() {
        try {
            // Show loading state
            formElements.boostButton.disabled = true;
            formElements.boostButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success UI
            showPopup(`
                <div class="boost-success">
                    <i class="fas fa-check-circle"></i>
                    <h3>Boost Successful!</h3>
                    <p>Your story is now featured on our homepage.</p>
                    <div class="boost-details">
                        <p><strong>Amount:</strong> $2.00</p>
                        <p><strong>Visibility Duration:</strong> 48 hours</p>
                    </div>
                </div>
            `, true);
            
        } catch (error) {
            // Show error UI
            showPopup(`
                <div class="boost-error">
                    <i class="fas fa-times-circle"></i>
                    <h3>Boost Failed</h3>
                    <p>❌ Please try again. Contact support if issue persists.</p>
                </div>
            `, false);
        } finally {
            // Reset button state
            formElements.boostButton.disabled = false;
            formElements.boostButton.innerHTML = '<i class="fas fa-bolt"></i> Boost This Tale for $2';
        }
    });

    // Initialize the page
    initializePage();
});
