/* ==========================================================================
   AADHI GURU MATHAJI - Premium Spiritual Website
   Main JavaScript — v2.0 (Redesigned)
   ========================================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // ================================================================
    // 1. PRELOADER
    // ================================================================
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hidden'), 600);
    });
    
    // Fallback: hide after 3s
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) preloader.classList.add('hidden');
    }, 3000);

    // ================================================================
    // 2. CUSTOM CURSOR
    // ================================================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });
        
        // Smooth follow for outline
        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.12;
            outlineY += (mouseY - outlineY) * 0.12;
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Enlarge on interactive elements
        document.querySelectorAll('a, button, .btn, .gallery-item, .teaching-card, .event-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.width = '12px';
                cursorDot.style.height = '12px';
                cursorOutline.style.width = '56px';
                cursorOutline.style.height = '56px';
                cursorOutline.style.borderColor = 'var(--gold-light)';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.width = '8px';
                cursorDot.style.height = '8px';
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.borderColor = 'var(--gold)';
            });
        });
    }

    // ================================================================
    // 3. HEADER SCROLL EFFECT
    // ================================================================
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        // Keep header always visible - just toggle the smaller padding style
        header.style.transform = 'translateY(0)';
        
        if (window.pageYOffset > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
    });

    // ================================================================
    // 4. MOBILE MENU
    // ================================================================
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ================================================================
    // 5. ACTIVE NAV LINK
    // ================================================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ================================================================
    // 6. COUNTER ANIMATION
    // ================================================================
    function animateCounter(el, target, duration = 2000) {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            
            el.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target.toLocaleString();
            }
        }
        requestAnimationFrame(update);
    }
    
    const expNums = document.querySelectorAll('.exp-num');
    let countersDone = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersDone) {
                countersDone = true;
                expNums.forEach(el => {
                    const target = parseInt(el.getAttribute('data-count'));
                    animateCounter(el, target);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (expNums.length > 0) {
        counterObserver.observe(expNums[0].closest('.about-experience'));
    }

    // ================================================================
    // 7. BACK TO TOP
    // ================================================================
    const backTop = document.getElementById('backTop');
    
    window.addEventListener('scroll', () => {
        backTop.classList.toggle('visible', window.pageYOffset > 500);
    });
    
    backTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ================================================================
    // 8. SMOOTH SCROLL FOR ANCHORS
    // ================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offset = header.offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================================================
    // 9. CONTACT FORM
    // ================================================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('.btn-submit');
            const original = btn.innerHTML;
            
            btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<span>Sent! 🙏</span><i class="fas fa-check"></i>';
                btn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                
                this.reset();
                
                showNotification('Thank you! Your message has been sent. May divine blessings be with you. ॐ');
                
                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }

    // ================================================================
    // 10. NEWSLETTER FORM
    // ================================================================
    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            if (input.value.trim()) {
                input.value = '';
                showNotification('Thank you for subscribing! You will receive spiritual updates. ॐ');
            }
        });
    }

    // ================================================================
    // 11. NOTIFICATION SYSTEM
    // ================================================================
    function showNotification(message) {
        const existing = document.querySelector('.notification-toast');
        if (existing) existing.remove();
        
        const notif = document.createElement('div');
        notif.className = 'notification-toast';
        notif.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;
        document.body.appendChild(notif);
        
        requestAnimationFrame(() => notif.classList.add('show'));
        
        notif.querySelector('.notification-close').addEventListener('click', () => {
            notif.classList.remove('show');
            setTimeout(() => notif.remove(), 400);
        });
        
        setTimeout(() => {
            if (document.body.contains(notif)) {
                notif.classList.remove('show');
                setTimeout(() => notif.remove(), 400);
            }
        }, 5000);
    }

    // ================================================================
    // 12. LIGHTBOX — Image Popup with Dynamic Navigation
    // ================================================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    let lightboxData = [];
    let currentIndex = 0;

    // Build lightbox data from gallery items
    galleryItems.forEach((item, index) => {
        const imgDiv = item.querySelector('.gallery-img');
        const bgImage = imgDiv ? imgDiv.style.backgroundImage : '';
        const url = bgImage.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
        const title = item.querySelector('.gallery-overlay h4')?.textContent || 'Sacred Moment';
        const location = item.querySelector('.gallery-overlay p')?.textContent || 'Ashram';
        const category = item.querySelector('.gallery-cat')?.textContent || '';

        lightboxData.push({ url, title, location, category });

        // Click to open lightbox
        item.addEventListener('click', () => openLightbox(index));
    });

    function openLightbox(index) {
        currentIndex = index;
        const data = lightboxData[currentIndex];

        // Remove existing lightbox if any
        const existing = document.querySelector('.lightbox-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <button class="lightbox-close" aria-label="Close">&times;</button>
            <button class="lightbox-nav lightbox-prev" aria-label="Previous"><i class="fas fa-chevron-left"></i></button>
            <button class="lightbox-nav lightbox-next" aria-label="Next"><i class="fas fa-chevron-right"></i></button>
            <div class="lightbox-content">
                <div class="lightbox-image-wrap">
                    <img src="${data.url}" alt="${data.title}" />
                </div>
                <div class="lightbox-caption">
                    <h3>${data.title}</h3>
                    <p>${data.location}</p>
                    <div class="lightbox-counter">${currentIndex + 1} / ${lightboxData.length}</div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        // Trigger animation
        requestAnimationFrame(() => overlay.classList.add('active'));

        // Close handlers
        const close = () => closeLightbox(overlay);
        overlay.querySelector('.lightbox-close').addEventListener('click', close);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close();
        });

        // Navigation handlers
        const prevBtn = overlay.querySelector('.lightbox-prev');
        const nextBtn = overlay.querySelector('.lightbox-next');

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(-1, overlay);
        });
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(1, overlay);
        });

        // Keyboard navigation
        const keyHandler = (e) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') navigateLightbox(-1, overlay);
            if (e.key === 'ArrowRight') navigateLightbox(1, overlay);
        };
        document.addEventListener('keydown', keyHandler);

        // Store keyHandler reference for cleanup
        overlay._keyHandler = keyHandler;
    }

    function navigateLightbox(direction, overlay) {
        currentIndex = (currentIndex + direction + lightboxData.length) % lightboxData.length;
        const data = lightboxData[currentIndex];

        const img = overlay.querySelector('.lightbox-image-wrap img');
        const captionTitle = overlay.querySelector('.lightbox-caption h3');
        const captionLoc = overlay.querySelector('.lightbox-caption p');
        const counter = overlay.querySelector('.lightbox-counter');

        // Fade out, swap, fade in
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';

        setTimeout(() => {
            img.src = data.url;
            img.alt = data.title;
            captionTitle.textContent = data.title;
            captionLoc.textContent = data.location;
            counter.textContent = `${currentIndex + 1} / ${lightboxData.length}`;

            requestAnimationFrame(() => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            });
        }, 200);
    }

    function closeLightbox(overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', overlay._keyHandler);
        setTimeout(() => overlay.remove(), 300);
    }

    // ================================================================
    // 13. ABOUT IMAGE CLICK — Open in HD Lightbox
    // ================================================================
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage && aboutImage.dataset.aboutImage) {
        aboutImage.addEventListener('click', function() {
            const url = this.dataset.aboutImage;
            const title = this.dataset.aboutTitle || 'Aadhi Guru Mathaji';
            const location = this.dataset.aboutLocation || 'Divine Presence';

            // Remove existing lightbox
            const existing = document.querySelector('.lightbox-overlay');
            if (existing) existing.remove();

            const overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            overlay.innerHTML = `
                <button class="lightbox-close" aria-label="Close">&times;</button>
                <div class="lightbox-content">
                    <div class="lightbox-image-wrap" style="max-width:90vw;max-height:85vh;">
                        <img src="${url}" alt="${title}" style="max-width:90vw;max-height:85vh;object-fit:contain;" />
                    </div>
                    <div class="lightbox-caption">
                        <h3>${title}</h3>
                        <p>${location}</p>
                    </div>
                </div>
            `;

            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => overlay.classList.add('active'));

            const close = () => {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                setTimeout(() => overlay.remove(), 300);
            };
            overlay.querySelector('.lightbox-close').addEventListener('click', close);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) close();
            });
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); }
            });
        });
    }

    // ================================================================
    // 14. ABOUT FEATURES — Double Bounce Animation on Scroll
    // ================================================================
    const featureItems = document.querySelectorAll('.about-feature');
    featureItems.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });

    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.about-feature');
                items.forEach((item, i) => {
                    setTimeout(() => {
                        item.style.animation = 'featureBounce 0.6s ease forwards';
                        item.style.opacity = '1';
                    }, i * 120);
                });
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const featuresContainer = document.querySelector('.about-features');
    if (featuresContainer) {
        featureObserver.observe(featuresContainer);
    }

    // ================================================================
    // 15. VIDEO POPUP MODAL
    // ================================================================
    function openVideoModal(videoId) {
        const existing = document.querySelector('.video-modal-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.className = 'video-modal-overlay';
        overlay.innerHTML = `
            <div class="video-modal-content">
                <button class="video-modal-close">&times;</button>
                <div class="video-fallback" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;">
                    <a href="https://youtu.be/${videoId}" target="_blank" class="btn btn-primary" style="font-size:1rem;">
                        <i class="fab fa-youtube"></i> <span>Open on YouTube</span>
                    </a>
                </div>
                <div class="video-iframe-wrap" style="position:absolute;inset:0;">
                    <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%;height:100%;border:none;"></iframe>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => overlay.classList.add('active'));

        // Fallback if embed fails (error 153 = embedding blocked or unavailable)
        setTimeout(() => {
            const iframeWrap = overlay.querySelector('.video-iframe-wrap');
            const fallback = overlay.querySelector('.video-fallback');
            if (iframeWrap && fallback) {
                iframeWrap.style.display = 'none';
                fallback.style.display = 'flex';
            }
        }, 5000);

        const close = () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => overlay.remove(), 300);
        };

        overlay.querySelector('.video-modal-close').addEventListener('click', close);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close();
        });
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); }
        });
    }

    // Video thumbnail clicks
    document.querySelectorAll('.video-card-link').forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.dataset.videoId;
            if (videoId) openVideoModal(videoId);
        });
    });

    // Video CTA button clicks
    document.querySelectorAll('.video-popup-btn').forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.dataset.videoId;
            if (videoId) openVideoModal(videoId);
        });
    });

    // ================================================================
    // 16. TEACHING CARD POPUP
    // ================================================================
    document.querySelectorAll('.teaching-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3')?.textContent || '';
            const iconElem = this.querySelector('.card-icon i');
            const iconClass = iconElem ? iconElem.className : 'fas fa-om';
            const description = this.getAttribute('data-description') || '';

            // Remove existing modal
            const existing = document.querySelector('.teaching-modal-overlay');
            if (existing) existing.remove();

            const overlay = document.createElement('div');
            overlay.className = 'teaching-modal-overlay';
            overlay.innerHTML = `
                <div class="teaching-modal">
                    <button class="teaching-modal-close">&times;</button>
                    <div class="teaching-modal-icon">
                        <i class="${iconClass}"></i>
                    </div>
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <span class="teaching-modal-om">ॐ</span>
                </div>
            `;

            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';

            requestAnimationFrame(() => overlay.classList.add('active'));

            const closeModal = () => {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                setTimeout(() => overlay.remove(), 300);
            };

            overlay.querySelector('.teaching-modal-close').addEventListener('click', closeModal);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeModal();
            });

            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    });

    // ================================================================
    // 14. SCROLL REVEAL ANIMATIONS (with jump for teaching cards)
    // ================================================================
    const revealElements = document.querySelectorAll(
        '.teaching-card, .event-card, .gallery-item, .cta-option, .about-feature, .about-content p'
    );
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply jump animation to teaching cards
                if (entry.target.classList.contains('teaching-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.classList.add('jump-in');
                } else {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    
    revealElements.forEach((el, i) => {
        if (el.classList.contains('teaching-card')) {
            el.style.opacity = '0';
        } else {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
        }
        revealObserver.observe(el);
    });

    // ================================================================
    // 14. PARALLAX OM ON HERO (Desktop only)
    // ================================================================
    const hero = document.querySelector('.hero');
    const heroOm = document.querySelector('.hero-om');
    
    if (hero && heroOm && window.innerWidth > 768) {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            heroOm.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // ================================================================
    // 15. INIT
    // ================================================================
    setTimeout(updateActiveNavLink, 100);
    
    console.log('🕉️  Aadhi Guru Mathaji — Website v2.0 initialized. Divine grace be with you.');
});
