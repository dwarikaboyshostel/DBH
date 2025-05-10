// Reviews Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel-wrapper');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-nav.prev');
        const nextBtn = carousel.querySelector('.carousel-nav.next');
        
        let currentIndex = 0;
        const slideCount = slides.length;
        
        // Initialize carousel
        updateCarousel();
        
        // Event listeners for navigation buttons
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateCarousel();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        });
        
        // Auto-advance carousel every 5 seconds
        let autoAdvance = setInterval(() => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        }, 5000);
        
        // Pause auto-advance on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoAdvance);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoAdvance = setInterval(() => {
                currentIndex = (currentIndex + 1) % slideCount;
                updateCarousel();
            }, 5000);
        });
        
        // Touch swipe functionality
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left
                currentIndex = (currentIndex + 1) % slideCount;
                updateCarousel();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                updateCarousel();
            }
        }
        
        function updateCarousel() {
            // Update track position
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update button states
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentIndex === slideCount - 1 ? '0.5' : '1';
            
            // Add active class to current slide
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentIndex);
            });
        }
    });
});

// Review Selection Functionality
document.addEventListener('DOMContentLoaded', function() {
    const reviewButtons = document.querySelectorAll('.review-selection .btn');
    const hostelReviews = document.querySelector('.hostel-reviews-container');
    const tiffinReviews = document.querySelector('.tiffin-reviews-container');
    const reviewCount = document.getElementById('reviewCount');
    const reviewsModal = document.getElementById('reviewsModal');

    // Function to show reviews
    function showReviews(type) {
        // Update review count
        if (reviewCount) {
            reviewCount.textContent = type === 'hostel' ? '200+' : '160+';
        }

        // Show/hide appropriate reviews
        if (type === 'hostel') {
            if (hostelReviews) {
                hostelReviews.style.display = 'block';
            }
            if (tiffinReviews) {
                tiffinReviews.style.display = 'none';
            }
        } else {
            if (tiffinReviews) {
                tiffinReviews.style.display = 'block';
            }
            if (hostelReviews) {
                hostelReviews.style.display = 'none';
            }
        }
    }

    // Add click event listeners to buttons
    reviewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const reviewType = this.getAttribute('data-review-type');
            showReviews(reviewType);
        });
    });

    // Handle modal show event
    if (reviewsModal) {
        reviewsModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const reviewType = button.getAttribute('data-review-type');
            showReviews(reviewType);
        });
    }
}); 