document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed navbar
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. Navbar Scroll Effect (adding a shadow/background on scroll)
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
            nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
        }
    });

    // 3. Interactive 'Enroll Now' buttons
    const enrollBtns = document.querySelectorAll('.enroll-btn');
    enrollBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const courseTitle = e.target.closest('.course-content, .brand-card').querySelector('h3, .course-title').innerText;
            alert(`Thanks for your interest in "${courseTitle}"! Redirecting to enrollment page...`);
        });
    });

    // 4. General buttons (Start Learning, Get Daily Updates, etc.)
    const primaryBtns = document.querySelectorAll('.btn-primary');
    primaryBtns.forEach(btn => {
        // Prevent default only if it doesn't have an href or target="_blank"
        if (!btn.hasAttribute('href')) {
            btn.addEventListener('click', (e) => {
                if (e.target.innerText.includes('Start Learning') || e.target.innerText.includes('Create Your Free Account')) {
                    alert("Redirecting to the registration portal...");
                } else if (e.target.innerText.includes('Take Skill Assessment')) {
                    alert("Starting your personalized skill assessment...");
                } else if (e.target.innerText.includes('Get Daily Updates')) {
                    alert("Subscribing you to our daily guidance alerts...");
                }
            });
        }
    });

    // 5. AI Assistant Interactivity
    const aiToggle = document.querySelector('.ai-toggle');
    const aiChatBox = document.getElementById('aiChatBox');
    const aiSendBtn = document.querySelector('.ai-send');
    const aiInput = document.querySelector('.ai-input');
    const aiBody = document.querySelector('.ai-body');

    if (aiToggle && aiChatBox) {
        // We override the inline onclick if this JS is active
        aiToggle.removeAttribute('onclick');

        // Hide by default on load
        aiChatBox.style.display = 'none';

        aiToggle.addEventListener('click', () => {
            if (aiChatBox.style.display === 'none' || aiChatBox.style.display === '') {
                aiChatBox.style.display = 'flex';
                aiInput.focus();
            } else {
                aiChatBox.style.display = 'none';
            }
        });
    }

    if (aiSendBtn && aiInput && aiBody) {
        const sendMessage = () => {
            const text = aiInput.value.trim();
            if (text === '') return;

            // User Message
            const userMsg = document.createElement('div');
            userMsg.className = 'ai-message';
            userMsg.style.background = 'var(--primary)';
            userMsg.style.color = 'white';
            userMsg.style.marginLeft = 'auto';
            userMsg.style.borderBottomLeftRadius = '12px';
            userMsg.style.borderBottomRightRadius = '4px';
            userMsg.textContent = text;
            aiBody.appendChild(userMsg);

            aiInput.value = '';
            aiBody.scrollTop = aiBody.scrollHeight;

            // Simulated AI Response
            setTimeout(() => {
                const aiResponse = document.createElement('div');
                aiResponse.className = 'ai-message';
                aiResponse.textContent = "That's a great question! I am currently a demo assistant, but I'll connect you to live support for deeper guidance.";
                aiBody.appendChild(aiResponse);
                aiBody.scrollTop = aiBody.scrollHeight;
            }, 800);
        };

        aiSendBtn.addEventListener('click', sendMessage);
        aiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});
