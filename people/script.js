const introOverlay = document.getElementById('introOverlay');
const mainContent = document.getElementById('mainContent');
const bgMusic = document.getElementById('bgMusic');

// Animated stars background
const starsCanvas = document.getElementById('starsCanvas');
if (starsCanvas) {
    const ctx = starsCanvas.getContext('2d');
    let stars = [];
    
    function resizeCanvas() {
        starsCanvas.width = window.innerWidth;
        starsCanvas.height = window.innerHeight;
        initStars();
    }
    
    function initStars() {
        stars = [];
        const numStars = 200;
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * starsCanvas.width,
                y: Math.random() * starsCanvas.height,
                radius: Math.random() * 1.5,
                speed: Math.random() * 0.5 + 0.1,
                opacity: Math.random() * 0.5 + 0.5
            });
        }
    }
    
    function animateStars() {
        ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
            
            star.y += star.speed;
            
            if (star.y > starsCanvas.height) {
                star.y = 0;
                star.x = Math.random() * starsCanvas.width;
            }
        });
        
        requestAnimationFrame(animateStars);
    }
    
    resizeCanvas();
    animateStars();
    window.addEventListener('resize', resizeCanvas);
}

// Animated rain background
const rainCanvas = document.getElementById('rainCanvas');
if (rainCanvas) {
    const ctx = rainCanvas.getContext('2d');
    let raindrops = [];
    
    function resizeCanvas() {
        rainCanvas.width = window.innerWidth;
        rainCanvas.height = window.innerHeight;
        initRain();
    }
    
    function initRain() {
        raindrops = [];
        const numDrops = 150;
        for (let i = 0; i < numDrops; i++) {
            raindrops.push({
                x: Math.random() * rainCanvas.width,
                y: Math.random() * rainCanvas.height,
                length: Math.random() * 20 + 10,
                speed: Math.random() * 3 + 5,
                opacity: Math.random() * 0.3 + 0.3
            });
        }
    }
    
    function animateRain() {
        ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
        
        raindrops.forEach(drop => {
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x, drop.y + drop.length);
            ctx.strokeStyle = `rgba(174, 194, 224, ${drop.opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            
            drop.y += drop.speed;
            
            if (drop.y > rainCanvas.height) {
                drop.y = -drop.length;
                drop.x = Math.random() * rainCanvas.width;
            }
        });
        
        requestAnimationFrame(animateRain);
    }
    
    resizeCanvas();
    animateRain();
    window.addEventListener('resize', resizeCanvas);
}

// Animated snow background
const snowCanvas = document.getElementById('snowCanvas');
if (snowCanvas) {
    const ctx = snowCanvas.getContext('2d');
    let snowflakes = [];
    
    function resizeCanvas() {
        snowCanvas.width = window.innerWidth;
        snowCanvas.height = window.innerHeight;
        initSnow();
    }
    
    function initSnow() {
        snowflakes = [];
        const numFlakes = 150;
        for (let i = 0; i < numFlakes; i++) {
            snowflakes.push({
                x: Math.random() * snowCanvas.width,
                y: Math.random() * snowCanvas.height,
                radius: Math.random() * 3 + 1,
                speed: Math.random() * 1 + 0.5,
                drift: Math.random() * 0.5 - 0.25,
                opacity: Math.random() * 0.6 + 0.4
            });
        }
    }
    
    function animateSnow() {
        ctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
        
        snowflakes.forEach(flake => {
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
            ctx.fill();
            
            flake.y += flake.speed;
            flake.x += flake.drift;
            
            if (flake.y > snowCanvas.height) {
                flake.y = -flake.radius;
                flake.x = Math.random() * snowCanvas.width;
            }
            
            if (flake.x > snowCanvas.width) {
                flake.x = 0;
            } else if (flake.x < 0) {
                flake.x = snowCanvas.width;
            }
        });
        
        requestAnimationFrame(animateSnow);
    }
    
    resizeCanvas();
    animateSnow();
    window.addEventListener('resize', resizeCanvas);
}

// Handle intro click
if (introOverlay) {
    introOverlay.addEventListener('click', () => {
        introOverlay.classList.add('fade-out');
        mainContent.style.display = 'flex';
        
        // Play music
        bgMusic.play().catch(err => console.log('Audio play failed:', err));
        
        setTimeout(() => {
            introOverlay.style.display = 'none';
        }, 500);
    });
}

// 3D tilt effect
const card = document.querySelector('.profile-card');
let rafId = null;

if (card) {
    card.addEventListener('mousemove', (e) => {
        if (rafId) return;
        
        rafId = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Normalize to -1 to 1 range
            const normalizedX = (x - centerX) / centerX;
            const normalizedY = (y - centerY) / centerY;
            
            // Calculate rotation - Y axis for left/right, X axis for up/down
            const rotateY = normalizedX * 15;
            const rotateX = -normalizedY * 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            
            rafId = null;
        });
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(2deg) rotateY(2deg)';
    });
}
