window.onload = function() {
    const splash = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    
    // 3 Seconds Welcome Message
    setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            mainContent.style.display = 'block';
            createBubbles(); // Start background bubbles
            generateAbout(); // Load About text
        }, 1000); // 1s Fade-out time
    }, 3000); 
};

// Sidebar Toggle (Fixes the overlapping problem)
function toggleSettings() {
    const sidebar = document.getElementById('settings-sidebar');
    sidebar.classList.toggle('active'); // CSS-il ulla .active class-ai toggle seiyum
}

// Theme Switcher
function setTheme(mode) {
    if (mode === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Moving Bubbles Generator
function createBubbles() {
    const container = document.getElementById('bubble-bg');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 60 + 20 + 'px';
        bubble.style.width = size;
        bubble.style.height = size;
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDuration = Math.random() * 5 + 7 + 's';
        bubble.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(bubble);
    }
}

// Random About Text
function generateAbout() {
    const about = "Pic Zone is a professional AI-powered tool designed to upscale your images while maintaining crystal-clear quality. Our neural networks analyze every pixel to remove noise, sharpen edges, and balance colors, ensuring your low-resolution photos look high-definition in seconds.";
    document.getElementById('about-text').innerText = about;
}

// Notification Permission
function requestNotification() {
    if (!("Notification" in window)) {
        alert("This browser does not support notifications.");
    } else {
        Notification.requestPermission().then(permission => {
            alert("Notification Permission: " + permission);
        });
    }
}

// File Upload Logic (Basic Size Check)
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 10 * 1024 * 1024) {
            alert("File size is too large! Maximum 10MB.");
            this.value = "";
        } else {
            alert("Photo " + file.name + " uploaded successfully! Proceeding to enhancement...");
            // Next: Redirect to Enhance page logic
        }
    }
});
