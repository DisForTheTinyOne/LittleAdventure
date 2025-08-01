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
            'May',       
            "June"
        ];
        
        this.currentMonth = 0;
        this.monthDuration = 11000;
        this.isAnimating = false;
        
        this.initializeElements();
        this.bindEvents();
        
        // Set initial seasonal decorations (June flowers)
        setTimeout(() => {
            this.updateSeasonalDecorations(1);
        }, 100);
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
        this.characterUser = document.getElementById('character-user');
        this.characterGirlfriend = document.getElementById('character-girlfriend');
        this.characterDog = document.getElementById('character-dog');
        this.monthOverlay = document.getElementById('month-overlay');
        this.monthText = document.getElementById('month-text');
        this.blackTransition = document.getElementById('black-transition');
        this.transitionMonthText = document.getElementById('transition-month-text');
        this.transitionYearText = document.getElementById('transition-year-text');
        this.pathDecorations = document.querySelector('.path-decorations');

        this.backgroundMusic = document.getElementById('background-music');
        this.isFirstMonth = true;
        this.starAnimations = [];
        this.snowContainer = null;
        this.snowInterval = null;
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
        const containerHeight = 2000; // Height of .pan-image container
        const viewportHeight = window.innerHeight;
        const groundHeight = 80; // Only show 80px of ground, similar to month transitions
        
        // Calculate how much to translate to show only 80px of ground at the bottom of viewport
        // First move container up to show the bottom part: -(containerHeight - groundHeight)
        // Then adjust to position those 80px at the bottom of viewport: +(viewportHeight - groundHeight)
        const translateDistance = -(containerHeight - groundHeight) + (viewportHeight - groundHeight);
        
        return translateDistance;
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
        
        // Clear any existing month interval from previous runs
        if (this.monthInterval) {
            clearInterval(this.monthInterval);
        }
        
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
        
        // Smooth transition at the end of pan
        setTimeout(() => {
            // Switch containers first
            this.skyTransition.style.opacity = '0';
            this.landingPage.style.opacity = '0';
            
            setTimeout(() => {
                this.animationContainer.classList.remove('hidden');
                this.startMonthSequence();
            }, 2000);
        }, 9500);
        // }, 250000);
    }
    
    playMusicWithFadeIn() {
        // Set initial volume to 0
        this.backgroundMusic.volume = 0;
        
        // Play the music
        this.backgroundMusic.play().catch(error => {
            console.log('Audio play failed:', error);
        });
        
        // Fade in over 6 seconds
        const fadeInDuration = 6000; // 6 seconds
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

        // Show all characters when first month black screen appears
        this.characterUser.classList.add('show');
        this.characterGirlfriend.classList.add('show');
        this.characterDog.classList.add('show');

        this.monthText.textContent = monthName;
        this.monthOverlay.classList.add('show');
        this.blackTransition.style.transition = 'opacity 0s ease-in-out';
        this.blackTransition.style.opacity = '1';
        
        // Show year text for June (the initial month)
        this.transitionMonthText.textContent = monthName;
        this.transitionYearText.textContent = '2024';

        setTimeout(() => {
            this.transitionYearText.style.opacity = '1';
        }, 1000);
        
        // Update background when black screen is fully opaque (after 1s fade + some buffer)
        setTimeout(() => {
            this.updateBackground(1);
            // Set first month flag (user character visible in pan container)
            if (this.isFirstMonth) {
                this.isFirstMonth = false;
            }
        }, 1500);
        
        setTimeout(() => {
            this.transitionYearText.style.opacity = '0';
            this.blackTransition.style.transition = 'opacity 1s ease-in-out';
            this.blackTransition.style.opacity = '0';
        }, 2000);

        // Reset black screen for future transitions and hide month overlay
        setTimeout(() => {
            this.blackTransition.style.transition = '';
            this.blackTransition.style.opacity = '';
            this.blackTransition.style.visibility = '';
            this.monthOverlay.classList.remove('show');
        }, 6000);
    }

    showMonthWithTransition(monthIndex) {
        const monthName = this.months[monthIndex];
        
        // Start black screen fade-in transition (same as first month)
        this.blackTransition.style.visibility = 'visible';
        this.blackTransition.style.opacity = '0';
        this.blackTransition.style.transition = 'opacity 1s ease-in-out';
        this.transitionMonthText.textContent = monthName;
        
        // Fade in black screen
        setTimeout(() => {
            this.blackTransition.style.opacity = '1';
        }, 100);
        
        // Show month text on black screen during fade in
        setTimeout(() => {
            this.transitionMonthText.classList.add('show');
            // Make sure year text is hidden for all months after June

        }, 800);
        
        // Update background when black screen is fully opaque
        setTimeout(() => {
            this.updateBackground(monthIndex + 1);
        }, 1500);
        
        // Start fading out black screen
        setTimeout(() => {
            this.blackTransition.style.transition = 'opacity 1s ease-in-out';
            this.blackTransition.style.opacity = '0';
        }, 2500);
        
        
        // Hide transition text slightly after scene text appears
        setTimeout(() => {
            this.transitionMonthText.style.transition = 'opacity 1s ease-in-out';
            this.transitionMonthText.classList.remove('show');
            // Ensure year text is always hidden for all months after June
        }, 3400);
        
        // Hide month overlay and reset black screen
        setTimeout(() => {
            this.monthOverlay.classList.remove('show');
            this.blackTransition.style.visibility = 'hidden';
            this.blackTransition.style.transition = '';
        }, 6000);
    }
    
    transitionToNextMonth() {
        // Check if this is the last month (June)
        if (this.currentMonth === this.months.length - 1) {
            this.showFinalJuneTransition();
        } else {
            this.showMonthWithTransition(this.currentMonth);
        }
    }
    
    showFinalJuneTransition() {
        const monthName = this.months[this.currentMonth];
        
        // Bring characters above the black screen BEFORE it fades in
        this.characterUser.style.zIndex = '30';
        this.characterGirlfriend.style.zIndex = '30';
        this.characterDog.style.zIndex = '30';
        
        // Start black screen fade-in transition
        this.blackTransition.classList.add('final-transition');
        this.blackTransition.style.visibility = 'visible';
        this.blackTransition.style.opacity = '0';
        this.blackTransition.style.transition = 'opacity 1s ease-in-out';
        this.transitionMonthText.textContent = monthName;
        
        // Fade in black screen
        setTimeout(() => {
            this.blackTransition.style.opacity = '1';
        }, 100);
        
        // Show month text on black screen
        setTimeout(() => {
            this.transitionMonthText.classList.add('show');
        }, 800);
        
        // Move characters after black screen is visible
        setTimeout(() => {
            // Move girlfriend off screen to the right (slower)
            this.characterGirlfriend.style.transition = 'left 4s ease-in-out';
            this.characterGirlfriend.style.left = 'calc(120% + 150px)';
            
            // Move dog off screen to the right (slower) - maintaining same distance
            this.characterDog.style.transition = 'left 4s ease-in-out';
            this.characterDog.style.left = '120%';
        }, 1500);
        
        // Center the user character with additional delay
        setTimeout(() => {
            this.characterUser.style.transition = 'left 4s ease-in-out';
            this.characterUser.style.left = '50%';
            
            // Stop ground animation to represent character stopping running
            const groundPlatform = document.getElementById('ground-platform');
            if (groundPlatform) {
                groundPlatform.style.animationPlayState = 'paused';
            }
        }, 3000);
        
        // After user character is centered, wait 1.5s then fade in the panned landing page on top of black screen
        setTimeout(() => {
            // Prepare landing page (keep animation container visible)
            
            // Ensure pan image is in its final panned position
            const translateDistance = this.calculatePanDistance();
            this.panImage.style.transform = `translateY(${translateDistance}px)`;
            
            // Set landing page z-index higher than black screen to ensure it appears on top
            this.landingPage.style.zIndex = '35';
            this.skyTransition.style.zIndex = '35';
            
            // Set landing page to be invisible initially, then fade it in on top of black screen
            this.landingPage.style.opacity = '0';
            this.landingPage.style.transition = 'opacity 2s ease-in-out';
            this.skyTransition.style.opacity = '0';
            this.skyTransition.style.transition = 'opacity 2s ease-in-out';
            
            // Hide transition month text
            this.transitionMonthText.style.transition = 'opacity 1s ease-in-out';
            this.transitionMonthText.classList.remove('show');
            
            // Keep black screen visible and don't fade it out - landing page fades in on top
            
            // Fade in the landing page on top of the black screen
            setTimeout(() => {
                this.landingPage.style.opacity = '1';
                this.skyTransition.style.opacity = '1';
            }, 500);
        }, 7500);
        
        // Fade out animation container 1 second after landing page finishes fading in
        setTimeout(() => {
            this.animationContainer.style.transition = 'opacity 0s ease-out';
            this.animationContainer.style.opacity = '0';
        }, 9000);
    }
    
    createSnowContainer() {
        if (!this.snowContainer) {
            this.snowContainer = document.createElement('div');
            this.snowContainer.className = 'snow-container';
            this.mainScene.appendChild(this.snowContainer);
        }
    }
    
    createSnowflake() {
        if (!this.snowContainer) return;
        
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄';
        
        // Random size
        const sizes = ['small', 'medium', 'large'];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        snowflake.classList.add(size);
        
        // Random starting position
        snowflake.style.left = Math.random() * 100 + '%';
        
        // Random drift amount
        const drift = (Math.random() - 0.5) * 200; // -100px to 100px
        snowflake.style.setProperty('--drift', drift + 'px');
        
        // Random delay
        snowflake.style.animationDelay = Math.random() * 2 + 's';
        
        this.snowContainer.appendChild(snowflake);
        
        // Remove snowflake after animation completes
        const duration = size === 'small' ? 8000 : size === 'medium' ? 10000 : 12000;
        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.parentNode.removeChild(snowflake);
            }
        }, duration + 2000);
    }
    
    startSnow() {
        this.createSnowContainer();
        
        // Create initial snowflakes
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.createSnowflake();
            }, i * 200);
        }
        
        // Continue creating snowflakes
        this.snowInterval = setInterval(() => {
            this.createSnowflake();
        }, 800);
    }
    
    stopSnow() {
        if (this.snowInterval) {
            clearInterval(this.snowInterval);
            this.snowInterval = null;
        }
        
        if (this.snowContainer) {
            // Fade out existing snowflakes
            this.snowContainer.style.transition = 'opacity 2s ease-out';
            this.snowContainer.style.opacity = '0';
            
            setTimeout(() => {
                if (this.snowContainer && this.snowContainer.parentNode) {
                    this.snowContainer.parentNode.removeChild(this.snowContainer);
                    this.snowContainer = null;
                }
            }, 2000);
        }
    }
    
    updateBackground(monthNumber) {
        // Get the background image for this month
        const backgroundImage = `url('images/${monthNumber}.png')`;
        
        // Reset background animation
        this.backgroundLayer.style.animation = 'none';
        this.backgroundLayer.offsetHeight; // Force reflow
        this.backgroundLayer.style.animation = 'background-scroll 22s linear infinite';
        
        // Reset ground animation  
        const groundPlatform = document.getElementById('ground-platform');
        groundPlatform.style.animation = 'none';
        groundPlatform.offsetHeight; // Force reflow
        groundPlatform.style.animation = 'ground-scroll 12s linear infinite';
        
        // Set background image
        this.backgroundLayer.style.background = `${backgroundImage} center bottom no-repeat`;
        this.backgroundLayer.style.backgroundSize = "auto 100%";
        
        // Handle seasonal ground decorations
        this.updateSeasonalDecorations(monthNumber);
        
        // Handle character visibility for March (monthNumber 10)
        this.updateCharacterVisibility(monthNumber);
        
        // Handle snow effect for December (monthNumber 7)
        if (monthNumber === 7) {
            this.startSnow();
        } else {
            this.stopSnow();
        }
    }
    
    updateCharacterVisibility(monthNumber) {
        // March is monthNumber 10 - hide girlfriend and dog for this month only
        if (monthNumber === 10) {
            this.characterGirlfriend.style.opacity = '0';
            this.characterDog.style.opacity = '0';
        } else {
            // Show characters for all other months
            this.characterGirlfriend.style.opacity = '1';
            this.characterDog.style.opacity = '1';
        }
    }
    
    updateSeasonalDecorations(gradientNumber) {
        if (!this.pathDecorations) return;
        
        // Clear existing decorations
        this.pathDecorations.innerHTML = '';
        
        // Define seasonal decorations for each month
        const seasonalElements = {
            1: this.createSummerFlowers,      // June - Summer wildflowers
            2: this.createSunflowers,         // July - Sunflowers
            3: this.createWheatStalks,        // August - Wheat stalks
            4: this.createAcorns,             // September - Acorns & early fall
            5: this.createPumpkins,           // October - Pumpkins & autumn leaves
            6: this.createTurkeyFeathers,     // November - Turkey feathers & corn
            7: this.createHollyBerries,       // December - Holly berries (plus snow)
            8: this.createSnowmen,            // January - Snowmen & icicles  
            9: this.createValentineHearts,    // February - Hearts & roses
            10: this.createShamrocks,         // March - Shamrocks & spring buds
            11: this.createTulips,            // April - Tulips & cherry blossoms
            12: this.createLilacs,            // May - Lilacs & spring flowers
        };
        
        // Create seasonal elements for current month
        const createFunction = seasonalElements[gradientNumber];
        if (createFunction) {
            createFunction.call(this);
        }
    }

    createSummerFlowers() {
        // June - Colorful summer wildflowers (default flowers)
        for (let i = 1; i <= 6; i++) {
            const flower = document.createElement('div');
            flower.className = `flower flower-${i}`;
            flower.innerHTML = `
                <div class="flower-center"></div>
                <div class="petal petal-1"></div>
                <div class="petal petal-2"></div>
                <div class="petal petal-3"></div>
                <div class="petal petal-4"></div>
                <div class="petal petal-5"></div>
                <div class="flower-stem"></div>
            `;
            this.pathDecorations.appendChild(flower);
        }
    }

    createSunflowers() {
        // July - Bright sunflowers
        for (let i = 1; i <= 4; i++) {
            const sunflower = document.createElement('div');
            sunflower.className = `sunflower sunflower-${i}`;
            sunflower.innerHTML = `
                <div class="sunflower-center"></div>
                <div class="sunflower-petal"></div>
                <div class="sunflower-stem"></div>
            `;
            this.pathDecorations.appendChild(sunflower);
        }
    }

    createWheatStalks() {
        // August - Golden wheat stalks
        for (let i = 1; i <= 5; i++) {
            const wheat = document.createElement('div');
            wheat.className = `wheat wheat-${i}`;
            wheat.innerHTML = `
                <div class="wheat-grain"></div>
                <div class="wheat-stalk"></div>
            `;
            this.pathDecorations.appendChild(wheat);
        }
    }

    createAcorns() {
        // September - Acorns and early fall leaves
        for (let i = 1; i <= 4; i++) {
            const acorn = document.createElement('div');
            acorn.className = `acorn acorn-${i}`;
            acorn.innerHTML = `
                <div class="acorn-cap"></div>
                <div class="acorn-nut"></div>
            `;
            this.pathDecorations.appendChild(acorn);
        }
        
        for (let i = 1; i <= 3; i++) {
            const leaf = document.createElement('div');
            leaf.className = `fall-leaf fall-leaf-${i}`;
            this.pathDecorations.appendChild(leaf);
        }
    }

    createPumpkins() {
        // October - Pumpkins and autumn leaves
        for (let i = 1; i <= 3; i++) {
            const pumpkin = document.createElement('div');
            pumpkin.className = `pumpkin pumpkin-${i}`;
            pumpkin.innerHTML = `
                <div class="pumpkin-stem"></div>
                <div class="pumpkin-body"></div>
            `;
            this.pathDecorations.appendChild(pumpkin);
        }
        
        for (let i = 1; i <= 4; i++) {
            const leaf = document.createElement('div');
            leaf.className = `autumn-leaf autumn-leaf-${i}`;
            this.pathDecorations.appendChild(leaf);
        }
    }

    createTurkeyFeathers() {
        // November - Turkey feathers and corn
        for (let i = 1; i <= 3; i++) {
            const feather = document.createElement('div');
            feather.className = `turkey-feather feather-${i}`;
            this.pathDecorations.appendChild(feather);
        }
        
        for (let i = 1; i <= 2; i++) {
            const corn = document.createElement('div');
            corn.className = `corn corn-${i}`;
            corn.innerHTML = `
                <div class="corn-kernels"></div>
                <div class="corn-husk"></div>
            `;
            this.pathDecorations.appendChild(corn);
        }
    }

    createHollyBerries() {
        // December - Holly berries and leaves
        for (let i = 1; i <= 4; i++) {
            const holly = document.createElement('div');
            holly.className = `holly holly-${i}`;
            holly.innerHTML = `
                <div class="holly-berries"></div>
                <div class="holly-leaf"></div>
            `;
            this.pathDecorations.appendChild(holly);
        }
    }

    createSnowmen() {
        // January - Small snowmen and icicles
        for (let i = 1; i <= 2; i++) {
            const snowman = document.createElement('div');
            snowman.className = `mini-snowman snowman-${i}`;
            snowman.innerHTML = `
                <div class="snowman-head"></div>
                <div class="snowman-body"></div>
                <div class="snowman-base"></div>
            `;
            this.pathDecorations.appendChild(snowman);
        }
        
        for (let i = 1; i <= 3; i++) {
            const icicle = document.createElement('div');
            icicle.className = `icicle icicle-${i}`;
            this.pathDecorations.appendChild(icicle);
        }
    }

    createValentineHearts() {
        // February - Hearts and red roses
        for (let i = 1; i <= 3; i++) {
            const heart = document.createElement('div');
            heart.className = `valentine-heart heart-${i}`;
            this.pathDecorations.appendChild(heart);
        }
        
        for (let i = 1; i <= 3; i++) {
            const rose = document.createElement('div');
            rose.className = `red-rose rose-${i}`;
            rose.innerHTML = `
                <div class="rose-bloom"></div>
                <div class="rose-stem"></div>
            `;
            this.pathDecorations.appendChild(rose);
        }
    }

    createShamrocks() {
        // March - Shamrocks and spring buds
        for (let i = 1; i <= 4; i++) {
            const shamrock = document.createElement('div');
            shamrock.className = `shamrock shamrock-${i}`;
            shamrock.innerHTML = `
                <div class="shamrock-leaf"></div>
                <div class="shamrock-stem"></div>
            `;
            this.pathDecorations.appendChild(shamrock);
        }
        
        for (let i = 1; i <= 2; i++) {
            const bud = document.createElement('div');
            bud.className = `spring-bud bud-${i}`;
            this.pathDecorations.appendChild(bud);
        }
    }

    createTulips() {
        // April - Colorful tulips and cherry blossoms
        for (let i = 1; i <= 4; i++) {
            const tulip = document.createElement('div');
            tulip.className = `tulip tulip-${i}`;
            tulip.innerHTML = `
                <div class="tulip-bloom"></div>
                <div class="tulip-stem"></div>
            `;
            this.pathDecorations.appendChild(tulip);
        }
        
        for (let i = 1; i <= 2; i++) {
            const blossom = document.createElement('div');
            blossom.className = `cherry-blossom blossom-${i}`;
            this.pathDecorations.appendChild(blossom);
        }
    }

    createLilacs() {
        // May - Purple lilacs and spring flowers
        for (let i = 1; i <= 3; i++) {
            const lilac = document.createElement('div');
            lilac.className = `lilac lilac-${i}`;
            lilac.innerHTML = `
                <div class="lilac-cluster"></div>
                <div class="lilac-stem"></div>
            `;
            this.pathDecorations.appendChild(lilac);
        }
        
        for (let i = 1; i <= 3; i++) {
            const springFlower = document.createElement('div');
            springFlower.className = `spring-flower spring-${i}`;
            springFlower.innerHTML = `
                <div class="spring-center"></div>
                <div class="spring-petal"></div>
                <div class="spring-stem"></div>
            `;
            this.pathDecorations.appendChild(springFlower);
        }
    }

    
    completeAnimation() {
        clearInterval(this.monthInterval);
        // No final message - June ending is handled in showFinalJuneTransition
    }
    
    showFinalMessage() {
        this.monthText.textContent = '💕 Our First Year 💕';
        this.monthOverlay.classList.add('show');
        
        // Add special completion effects
        this.characterUser.style.animation = 'completion-celebration 2s ease-in-out infinite';
        this.characterGirlfriend.style.animation = 'completion-celebration 2s ease-in-out infinite';
        this.characterDog.style.animation = 'completion-celebration 2s ease-in-out infinite';
        
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
        this.blackTransition.classList.remove('final-transition');
        this.blackTransition.style.opacity = '';
        this.blackTransition.style.visibility = '';
        this.transitionMonthText.classList.remove('show');
        this.transitionYearText.classList.remove('show');
        this.transitionYearText.textContent = '';
        this.characterUser.style.animation = '';
        this.characterGirlfriend.style.animation = '';
        this.characterDog.style.animation = '';
        this.characterUser.classList.remove('show');
        this.characterGirlfriend.classList.remove('show');
        this.characterDog.classList.remove('show');
        
        // Reset character positions and z-index
        this.characterUser.style.transition = '';
        this.characterGirlfriend.style.transition = '';
        this.characterDog.style.transition = '';
        this.characterUser.style.left = 'calc(50% + 150px)';
        this.characterGirlfriend.style.left = '50%';
        this.characterDog.style.left = 'calc(50% - 150px)';
        this.characterUser.style.zIndex = '12';
        this.characterGirlfriend.style.zIndex = '11';
        this.characterDog.style.zIndex = '10';
        
        // Reset character visibility 
        this.characterGirlfriend.style.opacity = '1';
        this.characterDog.style.opacity = '1';
        
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
        
        // Stop snow effect
        this.stopSnow();
        
        // Reset to initial seasonal decorations (June flowers)
        this.updateSeasonalDecorations(1);
        
        // Reset ground animation
        const groundPlatform = document.getElementById('ground-platform');
        if (groundPlatform) {
            groundPlatform.style.animationPlayState = 'running';
        }
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