// Animation control and sequencing
class AnniversaryAnimation {
    constructor() {
        this.months = [
            'June',      // Month you met
            'July',
            'August', 
            'September',
            'October',
            'November',
            'December',
            'January',
            'February',
            'March',
            'April',
            'May'        // 1-year anniversary
        ];
        
        this.currentMonth = 0;
        this.monthDuration = 11000; // 12 seconds per month
        this.isAnimating = false;
        
        this.initializeElements();
        this.bindEvents();
    }
    
    initializeElements() {
        this.playButton = document.getElementById('play-button');
        this.landingPage = document.getElementById('landing-page');
        this.panImage = document.getElementById('pan-image');
        this.stars = document.querySelector('.stars');
        this.brightStars = document.querySelector('.bright-stars');
        this.sparklingStars = document.querySelector('.sparkling-stars');
        this.travelingStars = document.querySelectorAll('.comet');
        this.animationContainer = document.getElementById('animation-container');
        this.skyTransition = document.getElementById('sky-transition');
        this.skyGradient = document.querySelector('.sky-gradient');
        this.mainScene = document.getElementById('main-scene');
        this.backgroundLayer = document.getElementById('background-layer');
        this.character = document.getElementById('character');
        this.monthOverlay = document.getElementById('month-overlay');
        this.monthText = document.getElementById('month-text');
        this.blackTransition = document.getElementById('black-transition');
        this.transitionMonthText = document.getElementById('transition-month-text');
        this.progressBar = document.getElementById('progress-bar');
        this.backgroundMusic = document.getElementById('background-music');
        this.isFirstMonth = true;
        this.starAnimations = [];
    }
    
    bindEvents() {
        this.playButton.addEventListener('click', () => this.startAnimation());
        
        // Handle viewport resize (mobile orientation changes, window resize)
        window.addEventListener('resize', () => {
            if (this.isAnimating && this.panImage.style.transform !== 'translateY(0px)') {
                const translateDistance = this.calculatePanDistance();
                this.panImage.style.transform = `translateY(${translateDistance}px)`;
            }
        });
        
        // Start traveling stars animation
        this.startTravelingStars();
    }
    
    calculatePanDistance() {
        const imageHeight = 2000; // Height of pan.png
        const viewportHeight = window.innerHeight;
        const bottomOffset = 20; // 20px from bottom
        
        // Calculate how much to translate so bottom of screen is 20px from bottom of image
        const translateDistance = -(imageHeight - viewportHeight - bottomOffset);
        
        // Ensure we don't translate more than necessary (bounds checking)
        // If viewport is larger than image, don't translate at all
        return Math.min(0, translateDistance);
    }
    
    getRandomStartPosition() {
        const margin = 20; // Reduced margin for faster visibility
        const side = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
        
        switch(side) {
            case 0: // From top
                return { x: Math.random() * window.innerWidth, y: -margin };
            case 1: // From right
                return { x: window.innerWidth + margin, y: Math.random() * window.innerHeight };
            case 2: // From bottom
                return { x: Math.random() * window.innerWidth, y: window.innerHeight + margin };
            case 3: // From left
                return { x: -margin, y: Math.random() * window.innerHeight };
        }
    }
    
    getRandomEndPosition(startPos) {
        const margin = 20; // Reduced margin for faster visibility
        
        // Determine which side the start position is on
        let startSide;
        if (startPos.y < 0) startSide = 0; // top
        else if (startPos.x > window.innerWidth) startSide = 1; // right  
        else if (startPos.y > window.innerHeight) startSide = 2; // bottom
        else startSide = 3; // left
        
        // Choose a different side for the end position
        const oppositeSides = {
            0: [1, 2, 3], // top -> right, bottom, left
            1: [0, 2, 3], // right -> top, bottom, left
            2: [0, 1, 3], // bottom -> top, right, left
            3: [0, 1, 2]  // left -> top, right, bottom
        };
        
        const possibleSides = oppositeSides[startSide];
        const endSide = possibleSides[Math.floor(Math.random() * possibleSides.length)];
        
        switch(endSide) {
            case 0: // To top
                return { x: Math.random() * window.innerWidth, y: -margin };
            case 1: // To right
                return { x: window.innerWidth + margin, y: Math.random() * window.innerHeight };
            case 2: // To bottom
                return { x: Math.random() * window.innerWidth, y: window.innerHeight + margin };
            case 3: // To left
                return { x: -margin, y: Math.random() * window.innerHeight };
        }
    }
    
    animateTravelingStar(star) {
        const startPos = this.getRandomStartPosition();
        const endPos = this.getRandomEndPosition(startPos);
        const duration = 3000 + Math.random() * 4000; // 3-7 seconds (faster)
        const delay = Math.random() * 5000; // 0-5 second delay (reduced)
        
        // Set initial position
        star.style.left = startPos.x + 'px';
        star.style.top = startPos.y + 'px';
        star.style.opacity = '0';
        star.style.transition = 'none';
        
        setTimeout(() => {
            // Start movement
            star.style.transition = `left ${duration}ms linear, top ${duration}ms linear, opacity 300ms ease-out`;
            star.style.left = endPos.x + 'px';
            star.style.top = endPos.y + 'px';
            
            // Fade in quickly when movement starts
            setTimeout(() => {
                star.style.opacity = '1';
            }, 50);
            
            // Fade out near the end
            setTimeout(() => {
                if (!star.classList.contains('fade-out')) {
                    star.style.transition = `left ${duration}ms linear, top ${duration}ms linear, opacity 500ms ease-in`;
                    star.style.opacity = '0';
                }
            }, duration - 800);
            
            // Reset and restart after animation completes
            setTimeout(() => {
                if (!star.classList.contains('fade-out')) {
                    this.animateTravelingStar(star);
                }
            }, duration + 200);
            
        }, delay);
    }
    
    startTravelingStars() {
        this.travelingStars.forEach((star, index) => {
            // Stagger the start times for each star
            setTimeout(() => {
                this.animateTravelingStar(star);
            }, index * 2000); // 2 second stagger
        });
    }
    
    startAnimation() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        // Disable and fade out the button immediately
        this.playButton.disabled = true;
        
        // Fade out stars, sparkles, and traveling stars with 2 second transition
        this.stars.classList.add('fade-out');
        this.brightStars.classList.add('fade-out');
        this.sparklingStars.classList.add('fade-out');
        this.travelingStars.forEach(star => star.classList.add('fade-out'));
        
        // Start background music with fade-in
        this.playMusicWithFadeIn();
        
        // Start the pan down effect after 1 second delay
            // Calculate dynamic pan distance based on screen size
            const translateDistance = this.calculatePanDistance();
            
            // Pan the image down to reveal the bottom
            this.panImage.style.transform = `translateY(${translateDistance}px)`;
        
        // Simple transition at the end of pan - just fade in black screen with month
        setTimeout(() => {
            // Switch containers
            this.animationContainer.classList.remove('hidden');
            this.skyTransition.style.display = 'none';
            this.landingPage.style.display = 'none';
            
            // Set month text and fade in black screen
            this.transitionMonthText.textContent = this.months[0];
            this.blackTransition.style.visibility = 'visible';
            this.blackTransition.classList.add('fade-in');
            
            // Show the month text on the black screen
            setTimeout(() => {
                this.transitionMonthText.classList.add('show');
            }, 500);
            
            this.startMonthSequence();
        }, 11700);
    }
    
    playMusicWithFadeIn() {
        // Set initial volume to 0
        this.backgroundMusic.volume = 0;
        
        // Play the music
        this.backgroundMusic.play().catch(error => {
            console.log('Audio play failed:', error);
        });
        
        // Fade in over 3 seconds
        const fadeInDuration = 3000; // 3 seconds
        const targetVolume = 0.7; // Maximum volume (70%)
        const fadeInSteps = 60; // 60 steps for smooth fade
        const volumeIncrement = targetVolume / fadeInSteps;
        const stepDuration = fadeInDuration / fadeInSteps;
        
        let currentStep = 0;
        const fadeInInterval = setInterval(() => {
            currentStep++;
            this.backgroundMusic.volume = Math.min(volumeIncrement * currentStep, targetVolume);
            
            if (currentStep >= fadeInSteps) {
                clearInterval(fadeInInterval);
            }
        }, stepDuration);
    }
    
    startMonthSequence() {
        // Continue with the first month transition that was started manually
        this.continueFirstMonthTransition();
        this.updateProgressBar();
        
        // Set up interval for month transitions (now includes black screen time)
        this.monthInterval = setInterval(() => {
            this.currentMonth++;
            
            if (this.currentMonth >= this.months.length) {
                this.completeAnimation();
                return;
            }
            
            this.transitionToNextMonth();
        }, this.monthDuration);
    }
    
    continueFirstMonthTransition() {
        const monthName = this.months[0];
        
        // Show month text on black screen immediately (already opaque)
        setTimeout(() => {
            this.transitionMonthText.classList.add('show');
        }, 100);
        
        // Update background when ready
        setTimeout(() => {
            this.updateBackground(1);
            // Show character after first month's background is set
            if (this.isFirstMonth) {
                this.character.classList.add('show');
                this.isFirstMonth = false;
            }
        }, 500);
        
        // Start fading out black screen
        setTimeout(() => {
            this.blackTransition.style.opacity = '0';
        }, 1200);
        
        // Show month overlay on scene as black screen fades
        setTimeout(() => {
            this.monthText.textContent = monthName;
            this.monthOverlay.classList.add('show');
        }, 1400);
        
        // Hide transition text slightly after scene text appears
        setTimeout(() => {
            this.transitionMonthText.classList.remove('show');
        }, 1800);
        
        // Reset black screen for future transitions and hide month overlay
        setTimeout(() => {
            this.blackTransition.style.opacity = '';
            this.blackTransition.style.visibility = '';
            this.monthOverlay.classList.remove('show');
        }, 4800);
    }
    
    showMonthWithTransition(monthIndex) {
        const monthName = this.months[monthIndex];
        
        // Start black screen transition
        this.transitionMonthText.textContent = monthName;
        this.blackTransition.classList.add('fade-in');
        
        // Show month text on black screen after fade in
        setTimeout(() => {
            this.transitionMonthText.classList.add('show');
        }, 400);
        
        // Update background when black screen is fully opaque
        setTimeout(() => {
            this.updateBackground(monthIndex + 1);
            // Show character after first month's background is set
            if (this.isFirstMonth) {
                this.character.classList.add('show');
                this.isFirstMonth = false;
            }
        }, 1000);
        
        // Start fading out black screen (reduced by 300ms)
        setTimeout(() => {
            this.blackTransition.classList.remove('fade-in');
        }, 1700);
        
        // Show month overlay on scene as black screen fades (adjusted timing)
        setTimeout(() => {
            this.monthText.textContent = monthName;
            this.monthOverlay.classList.add('show');
        }, 1900);
        
        // Hide transition text slightly after scene text appears (adjusted timing)
        setTimeout(() => {
            this.transitionMonthText.classList.remove('show');
        }, 2300);
        
        // Hide month overlay after displaying for a while
        setTimeout(() => {
            this.monthOverlay.classList.remove('show');
        }, 4800);
    }
    
    transitionToNextMonth() {
        this.showMonthWithTransition(this.currentMonth);
        this.updateProgressBar();
    }
    
    updateBackground(gradientNumber) {
        // Get the background for this gradient number
        const backgrounds = {
            1: "url('images/1.png') center no-repeat, linear-gradient(90deg, #ff9a9e 0%, #fecfef 100%)",
            2: "url('images/2.png') center no-repeat, linear-gradient(90deg, #a8edea 0%, #fed6e3 100%)",
            3: "linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%)",
            4: "linear-gradient(90deg, #ff8a80 0%, #ea6100 100%)",
            5: "linear-gradient(90deg, #8fd3f4 0%, #84fab0 100%)",
            6: "linear-gradient(90deg, #cbaacb 0%, #ffccb6 100%)",
            7: "linear-gradient(90deg, #3b4371 0%, #f3904f 100%)",
            8: "linear-gradient(90deg, #b721ff 0%, #21d4fd 100%)",
            9: "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)",
            10: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
            11: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
            12: "linear-gradient(90deg, #fa709a 0%, #fee140 100%)"
        };
        
        // Reset background animation
        this.backgroundLayer.style.animation = 'none';
        this.backgroundLayer.offsetHeight; // Force reflow
        this.backgroundLayer.style.animation = 'background-scroll 20s linear infinite';
        
        // Reset ground animation  
        const groundPlatform = document.getElementById('ground-platform');
        groundPlatform.style.animation = 'none';
        groundPlatform.offsetHeight; // Force reflow
        groundPlatform.style.animation = 'ground-scroll 12s linear infinite';
        
        // Set background
        this.backgroundLayer.style.background = backgrounds[gradientNumber];
        if (gradientNumber <= 2) {
            this.backgroundLayer.style.backgroundSize = "85%, 100%";
        }
    }
    
    updateProgressBar() {
        const progress = ((this.currentMonth + 1) / this.months.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }
    
    completeAnimation() {
        clearInterval(this.monthInterval);
        
        // Show final message
        setTimeout(() => {
            this.showFinalMessage();
        }, 2000);
    }
    
    showFinalMessage() {
        this.monthText.textContent = '💕 Our First Year 💕';
        this.monthOverlay.classList.add('show');
        
        // Add special completion effects
        this.character.style.animation = 'character-bob 0.3s ease-in-out infinite alternate, completion-celebration 2s ease-in-out infinite';
        
        // Create floating hearts effect
        this.createFloatingHearts();
    }
    
    createFloatingHearts() {
        const heartContainer = document.createElement('div');
        heartContainer.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 20;
        `;
        
        this.mainScene.appendChild(heartContainer);
        
        // Create multiple floating hearts
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createHeart(heartContainer);
            }, i * 200);
        }
    }
    
    createHeart(container) {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 20}px;
            left: ${Math.random() * 100}%;
            bottom: -50px;
            animation: float-up 4s ease-out forwards;
            pointer-events: none;
        `;
        
        // Add floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-up {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes completion-celebration {
                0%, 100% { transform: translateX(-50%) translateY(0) scale(1); }
                50% { transform: translateX(-50%) translateY(-10px) scale(1.1); }
            }
        `;
        
        if (!document.querySelector('#completion-styles')) {
            style.id = 'completion-styles';
            document.head.appendChild(style);
        }
        
        container.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 4000);
    }
    
    // Add restart functionality
    restart() {
        this.currentMonth = 0;
        this.isAnimating = false;
        this.isFirstMonth = true;
        
        // Reset all elements
        this.landingPage.style.display = 'flex';
        this.animationContainer.classList.add('hidden');
        this.skyTransition.style.display = 'block';
        this.skyGradient.classList.remove('pan-down');
        this.panImage.style.transform = 'translateY(0)';
        this.monthOverlay.classList.remove('show');
        this.blackTransition.classList.remove('fade-in');
        this.blackTransition.style.opacity = '';
        this.blackTransition.style.visibility = '';
        this.transitionMonthText.classList.remove('show');
        this.progressBar.style.width = '0%';
        this.character.style.animation = '';
        this.character.classList.remove('show');
        
        // Reset button, stars, and traveling stars
        this.playButton.disabled = false;
        this.stars.classList.remove('fade-out');
        this.brightStars.classList.remove('fade-out');
        this.sparklingStars.classList.remove('fade-out');
        this.travelingStars.forEach(star => {
            star.classList.remove('fade-out');
            star.style.transition = '';
            star.style.opacity = '0';
        });
        
        // Restart traveling stars animation
        this.startTravelingStars();
        
        // Remove floating hearts container if exists
        const heartContainer = this.mainScene.querySelector('div[style*="pointer-events: none"]');
        if (heartContainer) {
            heartContainer.remove();
        }
        
        // Clear any running intervals
        if (this.monthInterval) {
            clearInterval(this.monthInterval);
        }
        
        // Stop and reset music
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
    }
}

// Initialize the animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animation = new AnniversaryAnimation();
    
    // Add restart functionality with 'R' key
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'r') {
            animation.restart();
        }
    });
    
    // Add double-click to restart
    document.addEventListener('dblclick', () => {
        animation.restart();
    });
});

// Add some extra visual polish
document.addEventListener('DOMContentLoaded', () => {
    // Add mouse movement parallax effect to stars
    document.addEventListener('mousemove', (e) => {
        const stars = document.querySelector('.stars');
        if (stars && !document.querySelector('.animation-container:not(.hidden)')) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            stars.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });
    
    // Add click ripple effect to play button
    const playButton = document.getElementById('play-button');
    playButton.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .play-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles); 