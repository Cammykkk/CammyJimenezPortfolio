document.addEventListener('DOMContentLoaded', () => {
    // 1. CAROUSEL SCROLL CONTROLS (Main Page)
    const controls = document.querySelectorAll('.carousel-control');

    controls.forEach(button => {
        button.addEventListener('click', () => {
            const carouselId = button.getAttribute('data-carousel');
            const track = document.getElementById(carouselId);
            const scrollAmount = 320;

            if (button.classList.contains('prev')) {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
    });

    // 2. SMOOTH SCROLL & HIGHLIGHT ON INDEX CLICK
    const exploreButtons = document.querySelectorAll('.explore-btn');

    exploreButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.closest('.cat-card').getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                targetSection.style.transform = 'scale(1.02)';
                targetSection.style.borderColor = 'var(--accent-pink)';
                
                setTimeout(() => {
                    targetSection.style.transform = 'scale(1)';
                    targetSection.style.borderColor = 'var(--dark-sage)';
                }, 1000);
            }
        });
    });

    // 3. FULL-SCREEN LIGHTBOX CAROUSEL SYSTEM (Sin fechas)
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentSectionItems = [];
    let currentIndex = 0;

    // Open lightbox on card click
    document.querySelectorAll('.carousel-track').forEach(track => {
        const itemsInTrack = Array.from(track.querySelectorAll('.carousel-card-item'));

        itemsInTrack.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentSectionItems = itemsInTrack;
                currentIndex = index;
                updateLightboxContent();
                lightboxModal.classList.add('active');
            });
        });
    });

    // Update lightbox view content
    const updateLightboxContent = () => {
        if (currentSectionItems.length === 0) return;
        const currentItem = currentSectionItems[currentIndex];
        
        const imgElement = currentItem.querySelector('img');
        const titleElement = currentItem.querySelector('.item-title');

        if (imgElement) {
            lightboxImg.src = imgElement.src;
            lightboxImg.alt = imgElement.alt || 'Work Preview';
        }

        if (titleElement) {
            lightboxTitle.textContent = titleElement.textContent;
        } else {
            lightboxTitle.textContent = 'Project Details';
        }
    };

    // Next item button in lightbox
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % currentSectionItems.length;
            updateLightboxContent();
        });
    }

    // Previous item button in lightbox
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + currentSectionItems.length) % currentSectionItems.length;
            updateLightboxContent();
        });
    }

    // Close lightbox
    const closeLightbox = () => {
        lightboxModal.classList.remove('active');
    };

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }

    // 4. INTERACTIVE MOBILE MENU TOGGLE
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            if (navLinksContainer.style.display === 'flex') {
                navLinksContainer.style.display = 'none';
            } else {
                navLinksContainer.style.display = 'flex';
                navLinksContainer.style.flexDirection = 'column';
                navLinksContainer.style.position = 'absolute';
                navLinksContainer.style.top = '70px';
                navLinksContainer.style.left = '0';
                navLinksContainer.style.width = '100%';
                navLinksContainer.style.backgroundColor = 'rgba(82, 109, 78, 0.98)';
                navLinksContainer.style.padding = '1.5rem';
                navLinksContainer.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
            }
        });
    }

    console.log("%c Portfolio Loaded Successfully! Designed for Cammy Jiménez (Manna) 🎨✨ ", "background: #d86475; color: #fff; padding: 5px 10px; border-radius: 4px; font-weight: bold;");
});