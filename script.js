
    const slides = document.querySelectorAll('#slide .item');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    let current = 0;
    const totalSlides = slides.length;

    // Create dots
    const dotsContainer = document.createElement('div');
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    }
    document.querySelector('#slide').appendChild(dotsContainer);

    const dots = document.querySelectorAll('.dot');

    function showSlide(n) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        
        current = (n + totalSlides) % totalSlides;
        
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    prevBtn.addEventListener('click', () => showSlide(current - 1));
    nextBtn.addEventListener('click', () => showSlide(current + 1));

    // Auto-play
    let autoPlay = setInterval(() => showSlide(current + 1), 5000);

    // Pause on hover
    document.querySelector('#slide').addEventListener('mouseenter', () => clearInterval(autoPlay));
    document.querySelector('#slide').addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => showSlide(current + 1), 5000);
    });

    // Start with first slide active
    slides[0].classList.add('active');
