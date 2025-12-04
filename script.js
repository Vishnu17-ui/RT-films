const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.getElementById('dots');
    
    let currentIndex = 0;
    const totalImages = items.length;

    // Create dots
    items.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToImage(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function showImage(index) {
        currentIndex = (index + totalImages) % totalImages;
        const imgUrl = items[currentIndex].style.backgroundImage.slice(5, -2);
        lightboxImg.src = imgUrl;
        
        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goToImage(index) {
        showImage(index);
        lightbox.classList.add('active');
    }

    // Open lightbox
    items.forEach((item, i) => {
        item.addEventListener('click', () => goToImage(i));
    });

    // Navigation
    prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

    // Close
    closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxImg) {
            lightbox.classList.remove('active');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
        if (e.key === 'Escape') lightbox.classList.remove('active');
    });

    // Touch swipe for mobile
    let touchStartX = 0;
    lightboxImg.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
    lightboxImg.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? nextBtn.click() : prevBtn.click();
        }
    });