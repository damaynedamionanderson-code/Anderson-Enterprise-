// Orbital Mechanics Simulation
const canvas = document.getElementById('orbitCanvas');
const ctx = canvas.getContext('2d');

let satellite = {
    x: 400,
    y: 150,
    vx: 3,
    vy: 0,
    trail: []
};

let planet = {
    x: 400,
    y: 250,
    radius: 50,
    mass: 1000
};

let params = {
    velocity: 5,
    altitude: 200,
    gravity: 5
};

function init() {
    resetSimulation();
    animate();
}

function resetSimulation() {
    satellite.x = 400;
    satellite.y = 250 - params.altitude;
    satellite.vx = params.velocity * 0.6;
    satellite.vy = 0;
    satellite.trail = [];
}

function updatePhysics() {
    // Calculate distance to planet center
    const dx = planet.x - satellite.x;
    const dy = planet.y - satellite.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate gravitational force
    const force = (params.gravity * planet.mass) / (distance * distance);
    
    // Calculate acceleration components
    const ax = force * (dx / distance);
    const ay = force * (dy / distance);
    
    // Update velocity
    satellite.vx += ax * 0.01;
    satellite.vy += ay * 0.01;
    
    // Update position
    satellite.x += satellite.vx;
    satellite.y += satellite.vy;
    
    // Add to trail
    satellite.trail.push({ x: satellite.x, y: satellite.y });
    if (satellite.trail.length > 200) {
        satellite.trail.shift();
    }
    
    // Collision detection
    if (distance < planet.radius + 10) {
        resetSimulation();
    }
    
    // Boundary check
    if (satellite.x < 0 || satellite.x > canvas.width || 
        satellite.y < 0 || satellite.y > canvas.height) {
        resetSimulation();
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 100; i++) {
        const x = (i * 137) % canvas.width;
        const y = (i * 251) % canvas.height;
        ctx.fillRect(x, y, 1, 1);
    }
    
    // Draw planet
    const gradient = ctx.createRadialGradient(
        planet.x, planet.y, 0,
        planet.x, planet.y, planet.radius
    );
    gradient.addColorStop(0, '#4a90d9');
    gradient.addColorStop(0.5, '#2a5a89');
    gradient.addColorStop(1, '#1a3a59');
    
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw planet atmosphere
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, planet.radius + 10, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(74, 144, 217, 0.3)';
    ctx.lineWidth = 5;
    ctx.stroke();
    
    // Draw satellite trail
    ctx.beginPath();
    for (let i = 0; i < satellite.trail.length; i++) {
        const point = satellite.trail[i];
        if (i === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    }
    ctx.strokeStyle = '#ff6600';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw satellite
    ctx.beginPath();
    ctx.arc(satellite.x, satellite.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#ff6600';
    ctx.fill();
    
    // Draw satellite glow
    ctx.beginPath();
    ctx.arc(satellite.x, satellite.y, 12, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 102, 0, 0.3)';
    ctx.fill();
    
    // Draw velocity vector
    ctx.beginPath();
    ctx.moveTo(satellite.x, satellite.y);
    ctx.lineTo(satellite.x + satellite.vx * 10, satellite.y + satellite.vy * 10);
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function animate() {
    updatePhysics();
    draw();
    requestAnimationFrame(animate);
}

// Event listeners for controls
document.getElementById('velocity').addEventListener('input', function(e) {
    params.velocity = parseFloat(e.target.value);
    document.getElementById('velocityValue').textContent = params.velocity.toFixed(1);
    resetSimulation();
});

document.getElementById('altitude').addEventListener('input', function(e) {
    params.altitude = parseInt(e.target.value);
    document.getElementById('altitudeValue').textContent = params.altitude;
    resetSimulation();
});

document.getElementById('gravity').addEventListener('input', function(e) {
    params.gravity = parseFloat(e.target.value);
    document.getElementById('gravityValue').textContent = params.gravity.toFixed(1);
    resetSimulation();
});

document.getElementById('resetSim').addEventListener('click', resetSimulation);

// Initialize simulation
init();
