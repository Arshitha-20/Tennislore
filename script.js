document.addEventListener('DOMContentLoaded', function() {
    // ==================== 1. DOM ELEMENTS ====================
    const sections = {
        main: document.getElementById('main-content'),
        submit: document.getElementById('story-submission'),
        vote: document.getElementById('community-voting'),
        boost: document.getElementById('boost-feature'),
        match: document.getElementById('sponsor-match') // <-- Add sponsor-match section
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
    const featuredStories = [
        { id: 1, title: "Wimbledon Wonder", snippet: "The crowd was electric as...", author: "Emma" },
        { id: 2, title: "Rally Royalty", snippet: "Longest rally of my life...", author: "Chris" },
        { id: 3, title: "Rain Delay Drama", snippet: "A twist in the clouds...", author: "Maya" },
        { id: 4, title: "Baseline Battle", snippet: "Trading backhands for hours...", author: "Leo" },
        { id: 5, title: "Final Point Glory", snippet: "It all came down to this shot...", author: "Zoe" },
    ];

    // ==================== 2. INITIALIZATION ====================
    function initializePage() {
        showSection('main');
        popup.overlay.classList.add('hidden');
    }

    // ==================== 3. SECTION MANAGEMENT ====================
    function showSection(sectionName) {
        Object.values(sections).forEach(section => {
            section.classList.add('hidden');
        });
        if (sections[sectionName]) {
            sections[sectionName].classList.remove('hidden');
        }
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
        window.location.hash = "";
    });

    navLinks.submit.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('submit');
        window.location.hash = "";
    });

    navLinks.vote.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('vote');
        window.location.hash = "";
    });

    navLinks.boost.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('boost');
        window.location.hash = "";
    });

    // Action buttons
    actionButtons.submit.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('submit');
        window.location.hash = "";
    });

    actionButtons.vote.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('vote');
        window.location.hash = "";
    });

    actionButtons.boost.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('boost');
        window.location.hash = "";
    });

    // Back home buttons
    document.querySelectorAll('[id^="back-home-"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('main');
            window.location.hash = "";
        });
    });

    // Popup controls
    popup.close.addEventListener('click', closePopup);
    popup.btn.addEventListener('click', closePopup);

    // Form submission
    formElements.submitForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm()) return;

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
            formElements.boostButton.disabled = true;
            formElements.boostButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

            await new Promise(resolve => setTimeout(resolve, 1500));

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
            showPopup(`
                <div class="boost-error">
                    <i class="fas fa-times-circle"></i>
                    <h3>Boost Failed</h3>
                    <p>❌ Please try again. Contact support if issue persists.</p>
                </div>
            `, false);
        } finally {
            formElements.boostButton.disabled = false;
            formElements.boostButton.innerHTML = '<i class="fas fa-bolt"></i> Boost This Tale for $2';
        }
    });

    // ==================== 7. CAROUSEL ====================
    const carousel = document.getElementById('story-carousel');
    let currentIndex = 0;

    function renderCarousel() {
        carousel.innerHTML = '';
        const visibleStories = featuredStories.slice(currentIndex, currentIndex + 1);

        visibleStories.forEach(story => {
            const card = document.createElement('div');
            card.className = 'carousel-card';
            card.innerHTML = `
                <h3>${story.title}</h3>
                <p>${story.snippet}</p>
                <p><strong>By ${story.author}</strong></p>
            `;
            carousel.appendChild(card);
        });
    }

    document.getElementById('prev-btn').onclick = () => {
        if (currentIndex > 0) currentIndex--;
        renderCarousel();
    };

    document.getElementById('next-btn').onclick = () => {
        if (currentIndex < featuredStories.length - 1) currentIndex++;
        renderCarousel();
    };

    renderCarousel();

    // --- Sponsor Match Module E ---
    async function fetchMatchDetails(matchId) {
        const matches = {
            "Match123": {
                Id: "Match Id: 123",
                 
            },
            "Match456": {
                Id: "Match Id: 456"
               
            }
        };
        await new Promise(res => setTimeout(res, 300));
        return matches[matchId] || {
            Id: "Unknown Match"
        };
    }

    async function showMatchPage(matchId) {
        // Hide all sections except sponsor-match
        Object.values(sections).forEach(section => section.classList.add('hidden'));
        sections.match.classList.remove('hidden');

        const match = await fetchMatchDetails(matchId);

        const container = sections.match;
        container.innerHTML = `
            <div class="form-container">
                <h2>Sponsor This Match</h2>
                <div class="court-line"></div>
                <div id="match-details">
                    <h3>${match.Id}</h3>
                   
                </div>
                <form id="sponsor-form">
                    <div class="form-group">
                        <label for="partnerName">Partner Name</label>
                        <input type="text" id="partnerName" name="partnerName" placeholder="Your Company/Name" required>
                    </div>
                    <div class="form-group">
                        <label for="contactEmail">Contact Email</label>
                        <input type="email" id="contactEmail" name="contactEmail" placeholder="you@example.com" required>
                    </div>
                    <button type="submit" class="btn">Sponsor for $1K</button>
                </form>
                <div class="back-home">
                    <a href="#" class="btn btn-outline" id="back-home-sponsor"><i class="fas fa-home"></i> Back to Home</a>
                </div>
            </div>
        `;

        document.getElementById("sponsor-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const partnerName = e.target.partnerName.value.trim();
            const contactEmail = e.target.contactEmail.value.trim();

            if (!partnerName || !contactEmail) {
                showPopup("❌ Please fill in all fields.", false);
                return;
            }

            try {
                await new Promise(res => setTimeout(res, 800));
                showPopup("✅ Sponsored Successfully! Thank you.", true);
                e.target.reset();
            } catch (err) {
                showPopup("❌ Sponsorship failed. Please try again.", false);
            }
        });

        document.getElementById("back-home-sponsor").addEventListener("click", (e) => {
            e.preventDefault();
            showSection('main');
            window.location.hash = "";
        });
    }

    function getMatchIdFromHash() {
        const hash = window.location.hash;
        const match = hash.match(/^#match=([\w-]+)$/i);
        return match ? match[1] : null;
    }

    async function handleRoute() {
        const matchId = getMatchIdFromHash();
        if (matchId) {
            await showMatchPage(matchId);
        } else {
            showSection('main');
        }
    }

    window.addEventListener("hashchange", handleRoute);
    window.addEventListener("load", handleRoute);
});
// ==================== 8. ADMIN DASHBOARD STUB (Module F) ====================
if (window.location.pathname.startsWith('/dashboard/tennislore')) {
    document.body.innerHTML = `
        <main>
            <h1>TennisLore Admin Dashboard</h1>
            <section>
                <h2>Story Submissions</h2>
                <table id="story-table" class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th><th>Name</th><th>Date</th><th>Status</th><th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </section>
            <section>
                <h2>Match Sponsor Requests</h2>
                <table id="sponsor-table" class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th><th>Match ID</th><th>Partner</th><th>Status</th><th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </section>
        </main>
        <style>
            .admin-table { width:100%; border-collapse:collapse; margin-bottom:2em;}
            .admin-table th, .admin-table td { border:1px solid #ccc; padding:8px; text-align:left;}
            .admin-table th { background:#f5f5f5;}
            .admin-table button { padding:4px 12px; }
        </style>
    `;

    // Simulated API data
    const storySubmissions = [
        { id: 1, name: "Emma", date: "2025-07-10", status: "pending" },
        { id: 2, name: "Chris", date: "2025-07-09", status: "approved" }
    ];
    const matchSponsorRequests = [
        { id: 101, matchId: "Match123", partner: "Acme Corp", status: "pending" },
        { id: 102, matchId: "Match456", partner: "Beta Inc", status: "approved" }
    ];

    // Render Story Submissions
    const storyTbody = document.querySelector('#story-table tbody');
    storySubmissions.forEach(story => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${story.id}</td>
            <td>${story.name}</td>
            <td>${story.date}</td>
            <td class="status">${story.status}</td>
            <td>
                ${story.status === 'pending' ? `<button class="approve-btn" data-type="story" data-id="${story.id}">Approve</button>` : ''}
            </td>
        `;
        storyTbody.appendChild(tr);
    });

    // Render Match Sponsor Requests
    const sponsorTbody = document.querySelector('#sponsor-table tbody');
    matchSponsorRequests.forEach(req => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${req.id}</td>
            <td>${req.matchId}</td>
            <td>${req.partner}</td>
            <td class="status">${req.status}</td>
            <td>
                ${req.status === 'pending' ? `<button class="approve-btn" data-type="sponsor" data-id="${req.id}">Approve</button>` : ''}
            </td>
        `;
        sponsorTbody.appendChild(tr);
    });

    // Approve button handler (simulated PATCH)
    document.querySelectorAll('.approve-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = btn.getAttribute('data-type');
            const id = btn.getAttribute('data-id');
            btn.disabled = true;
            btn.textContent = 'Approving...';
            setTimeout(() => {
                btn.closest('tr').querySelector('.status').textContent = 'approved';
                btn.remove();
                alert(`Status updated for ${type} ID ${id} (simulated PATCH)`);
            }, 700);
        });
    });
    //<!-- Minor update to trigger PR -->
}
initializePage();


