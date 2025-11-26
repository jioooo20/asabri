// Carousel Initialization and Controls
const emblaNode = document.querySelector('.embla');
const dotsNode = document.querySelector('.embla__dots');
const progressLine = document.querySelector('.timeline-line-progress');

// Labels for timeline navigation
const labels = ['Konten 1', 'Konten 2', 'Konten 3', 'Konten 4'];

// Initialize Embla Carousel
const emblaApi = EmblaCarousel(emblaNode, {
    loop: false,
    align: 'start',
    dragFree: false
});

/**
 * Generate navigation dots with timeline labels
 */
const generateDots = () => {
    const scrollSnaps = emblaApi.scrollSnapList();
    
    scrollSnaps.forEach((snap, index) => {
        const button = document.createElement('button');
        button.className = 'embla__dot';
        button.type = 'button';
        button.setAttribute('aria-label', `Go to slide ${index + 1}`);
        
        const wrapper = document.createElement('div');
        wrapper.className = 'dot-wrapper';
        
        // Character image
        const character = document.createElement('div');
        character.className = 'dot-character';
        const img = document.createElement('img');
        
        // Different character based on dot index
        if (index < 2) {
            img.src = 'images/tni.png';       // Dot 1-2: Young soldier
        } else if (index === 2) {
            img.src = 'images/tniadult.png';  // Dot 3: Adult soldier
        } else {
            img.src = 'images/tniold.png';    // Dot 4-7: Old soldier
        }
        
        img.alt = 'TNI Character';
        character.appendChild(img);
        
        const circle = document.createElement('div');
        circle.className = 'dot-circle';
        
        const label = document.createElement('div');
        label.className = 'dot-label';
        // label.textContent = labels[index] || `Slide ${index + 1}`;
        
        wrapper.appendChild(character);
        wrapper.appendChild(circle);
        wrapper.appendChild(label);
        button.appendChild(wrapper);
        
        button.addEventListener('click', () => {
            emblaApi.scrollTo(index);
        });
        
        dotsNode.appendChild(button);
    });
};

/**
 * Update selected dot and progress line
 */
const updateSelectedDot = () => {
    const selectedIndex = emblaApi.selectedScrollSnap();
    const dots = dotsNode.querySelectorAll('.embla__dot');
    
    dots.forEach((dot, index) => {
        if (index === selectedIndex) {
            dot.classList.add('embla__dot--selected');
        } else {
            dot.classList.remove('embla__dot--selected');
        }
    });

    // Update progress line to follow active dot position
    if (dots.length > 0) {
        const activeDot = dots[selectedIndex];
        const dotsContainer = dotsNode;
        const dotPosition = activeDot.offsetLeft + (activeDot.offsetWidth / 2);
        const containerWidth = dotsContainer.offsetWidth;
        const progressWidth = (dotPosition / containerWidth) * 100;
        progressLine.style.width = `${progressWidth}%`;
    }
};

/**
 * Initialize carousel
 */
const init = () => {
    generateDots();
    updateSelectedDot();

    // Listen to slide changes
    emblaApi.on('select', updateSelectedDot);
    emblaApi.on('reInit', () => {
        dotsNode.innerHTML = '<div class="timeline-line"><div class="timeline-line-progress"></div></div>';
        generateDots();
        updateSelectedDot();
    });
};

// Start the carousel
init();
