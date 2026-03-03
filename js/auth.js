document.addEventListener("DOMContentLoaded", () => {
    // --- UI Elements ---
    const authForm = document.getElementById('auth-form');
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const avatarInput = document.getElementById('avatar-upload');
    const imagePreview = document.getElementById('image-preview');
    const placeholder = document.getElementById('upload-placeholder');
    const logoutBtn = document.getElementById('logout-btn');

    const sheetId = "199lSNROkokVMpJYxX1kvim--LrqlBZd_rgjhwZQ9trk";

    // --- 1. ENHANCED PHOTO LOGIC (User-Specific) ---

/**
 * Function to apply photo based on the logged-in Student ID
 * @param {string} studentId 
 */
const applySavedPhoto = (studentId) => {
    if (!studentId) return;

    // Use a unique key for every user
    const userKey = `photo_${studentId}`;
    const savedPhoto = localStorage.getItem(userKey);
    
    const imagePreview = document.getElementById('image-preview');
    const placeholder = document.getElementById('upload-placeholder');

    if (savedPhoto && imagePreview) {
        imagePreview.style.backgroundImage = `url(${savedPhoto})`;
        imagePreview.style.backgroundSize = "cover";
        imagePreview.style.backgroundPosition = "center";
        imagePreview.style.border = "2px solid var(--brand-red)";
        if (placeholder) placeholder.style.display = 'none';
    } else {
        // Reset to default if no photo exists for THIS specific user
        if (imagePreview) {
            imagePreview.style.backgroundImage = 'none';
            imagePreview.style.border = "2px dashed var(--border-subtle)";
        }
        if (placeholder) placeholder.style.display = 'block';
    }
};

// Handle New Uploads keyed to the active user
if (avatarInput) {
    avatarInput.addEventListener('change', function() {
        const file = this.files[0];
        // We get the ID of the person currently logged in from the UI
        const currentActiveId = document.getElementById('display-id').innerText;

        if (file && currentActiveId && currentActiveId !== "---") {
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64Image = e.target.result;
                // Save with the Unique User Key
                localStorage.setItem(`photo_${currentActiveId}`, base64Image);
                applySavedPhoto(currentActiveId);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please log in before uploading a photo.");
        }
    });
}

    // Load photo immediately on page load
    applySavedPhoto();

    if (avatarInput) {
        avatarInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) { 
                    alert("FILE SIZE EXCEEDED: Limit 2MB");
                    return;
                }
                const reader = new FileReader();
                reader.onload = function(e) {
                    const base64Image = e.target.result;
                    localStorage.setItem('operative_photo', base64Image);
                    applySavedPhoto();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- 2. AUTHENTICATION & STATS LOGIC ---
    if (authForm) {
        authForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = authForm.querySelector('button[type="submit"]');
            const studentId = document.getElementById('student-id').value.trim();
            const passphrase = document.getElementById('passphrase').value.trim();
            
            submitBtn.innerText = "AUTHENTICATING...";
            submitBtn.disabled = true;

            try {
                // Fetch Auth Data from 'login' sheet
                const authUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=login`;
                const authRes = await fetch(authUrl);
                const authText = await authRes.text();
                const authRows = JSON.parse(authText.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/)[1]).table.rows;
                
                let validUser = false;
                for (let row of authRows) {
                    if (row.c && row.c[0] && String(row.c[0].v).trim() === studentId && (row.c[1] ? String(row.c[1].v).trim() : '') === passphrase) {
                        validUser = true; 
                        break;
                    }
                }

                if (!validUser) {
                    alert("ACCESS DENIED");
                    submitBtn.innerText = "Authenticate";
                    submitBtn.disabled = false;
                    return;
                }

                // Fetch Stats from 'Sheet1'
                const statsUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Sheet1`;
                const statsRes = await fetch(statsUrl);
                const statsText = await statsRes.text();
                const statsRows = JSON.parse(statsText.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/)[1]).table.rows;

                let stats = { name: studentId, thm: 'Not Linked', rooms: 0, points: 0 };
                for (let row of statsRows) {
                    if (row.c && row.c[0] && String(row.c[0].v).trim() === studentId) {
                        stats.thm = row.c[1] ? row.c[1].v : 'N/A';
                        stats.rooms = row.c[3] ? row.c[3].v : 0;
                        stats.points = row.c[4] ? row.c[4].v : 0;
                        break;
                    }
                }

                // Update UI
                document.getElementById('display-name').innerText = stats.name;
                document.getElementById('display-id').innerText = stats.name;
                document.getElementById('display-thm').innerText = stats.thm;
                document.getElementById('stat-rooms').innerText = stats.rooms;
                document.getElementById('stat-points').innerText = stats.points;

                // Transition Views
                loginView.style.display = 'none';
                dashboardView.style.display = 'block';
                
                // Re-apply photo just in case the dashboard rendering needs a nudge
                applySavedPhoto();

            } catch (err) {
                console.error(err);
                alert("GATEWAY ERROR");
                submitBtn.innerText = "Authenticate";
                submitBtn.disabled = false;
            }
        });
    }

    // --- 3. LOGOUT LOGIC ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Reload resets the state, effectively logging the user out
            window.location.reload();
        });
    }
});