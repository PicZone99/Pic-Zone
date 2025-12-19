window.onload = function() {
    // 1. Splash Screen Logic
    const splash = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    
    setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            mainContent.style.display = 'block';
            createBubbles(); // Bubbles start aagum
            generateAboutText(); // About text load aagum
        }, 1000);
    }, 3000);
};

// 2. Bubble Generator
function createBubbles() {
    const container = document.getElementById('bubble-bg');
    const bubbleCount = 15;
    
    for (let i = 0; i < bubbleCount; i++) {
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

// 3. Settings Sidebar Toggle
function toggleSettings() {
    const sidebar = document.getElementById('settings-sidebar');
    if (sidebar.style.right === "0px") {
        sidebar.style.right = "-300px";
    } else {
        sidebar.style.right = "0px";
    }
}

// 4. About Text Generator
function generateAboutText() {
    const about = "Pic Zone is an advanced AI-driven platform designed to upscale images, remove noise, and restore details in blurry photos. Built for professionals and hobbyists alike, we ensure your memories stay crystal clear.";
    document.getElementById('about-text').innerText = about;
}

// 5. Theme Changer (Basic)
function setTheme(mode) {
    if (mode === 'dark') {
        document.body.style.backgroundColor = "#2e003e";
        document.body.style.color = "white";
    } else {
        document.body.style.backgroundColor = "#f3e5f5";
        document.body.style.color = "black";
    }
}

// 6. Notification Request
function requestNotification() {
    alert("Pic Zone is requesting permission to send notifications.");
}

// 7. File Upload Basic Logic
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
        alert("File size too big! Max 10MB.");
    } else {
        alert("File " + file.name + " uploaded! Next: AI Enhancement Page.");
        // Ingu thaan namma adutha 'Enhance Page' logic-ai add seiyanum
    }
});
