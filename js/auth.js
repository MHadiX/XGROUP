document.addEventListener("DOMContentLoaded", () => {
    // --- UI Elements ---
    const authForm = document.getElementById('auth-form');
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const avatarInput = document.getElementById('avatar-upload');
    const imagePreview = document.getElementById('image-preview');
    const placeholder = document.getElementById('upload-placeholder');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Mobile Nav Elements
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navElements = document.getElementById('nav-elements');

    const sheetId = "199lSNROkokVMpJYxX1kvim--LrqlBZd_rgjhwZQ9trk";

    // --- 1. MOBILE NAV LOGIC ---
    if (mobileMenuBtn && navElements) {
        mobileMenuBtn.addEventListener('click', () => {
            navElements.classList.toggle('show');
        });
    }

    // --- 2. PHOTO LOGIC (Persistent & User-Specific) ---
    const applySavedPhoto = (studentId) => {
        if (!studentId) return;

        const userKey = `photo_${studentId}`;
        const savedPhoto = localStorage.getItem(userKey);

        if (savedPhoto && imagePreview) {
            imagePreview.style.backgroundImage = `url(${savedPhoto})`;
            imagePreview.style.backgroundSize = "cover";
            imagePreview.style.backgroundPosition = "center";
            imagePreview.style.border = "2px solid var(--brand-red)";
            if (placeholder) placeholder.style.display = 'none';
        } else if (imagePreview) {
            imagePreview.style.backgroundImage = 'none';
            imagePreview.style.border = "2px dashed var(--border-subtle)";
            if (placeholder) placeholder.style.display = 'block';
        }
    };

    // --- 3. SESSION RECOVERY (Solves the Refresh Issue) ---
    const activeSessionId = localStorage.getItem('active_operative_id');
    
    if (activeSessionId) {
        // If a session exists, skip login and fetch data immediately
        loginView.style.display = 'none';
        dashboardView.style.display = 'block';
        fetchAndPopulateDashboard(activeSessionId);
    }

    // --- 4. DATA FETCHING FUNCTION ---
    async function fetchAndPopulateDashboard(studentId) {
        try {
            // Fetch Stats from 'Sheet1'
            const statsUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Sheet1`;
            const statsRes = await fetch(statsUrl);
            const statsText = await statsRes.text();
            const statsJson = JSON.parse(statsText.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/)[1]);
            const statsRows = statsJson.table.rows;

            let allStudents = [];
            statsRows.forEach(row => {
                if (row.c && row.c[0] && row.c[0].v !== 'Name') {
                    allStudents.push({
                        name: String(row.c[0].v).trim(),
                        thm: row.c[1] ? String(row.c[1].v).trim() : 'N/A',
                        rooms: row.c[3] ? parseInt(row.c[3].v) || 0 : 0,
                        points: row.c[4] ? parseInt(row.c[4].v) || 0 : 0
                    });
                }
            });

            // Calculate Ranking
            allStudents.sort((a, b) => b.points - a.points);
            const studentIndex = allStudents.findIndex(s => s.name === studentId);
            const stats = allStudents[studentIndex];

            if (stats) {
                document.getElementById('display-name').innerText = stats.name;
                document.getElementById('display-id').innerText = stats.name;
                document.getElementById('display-thm').innerText = stats.thm;
                document.getElementById('stat-rooms').innerText = stats.rooms;
                document.getElementById('stat-points').innerText = stats.points;
                
                const rankEl = document.getElementById('stat-rank');
                if (rankEl) rankEl.innerText = `#${studentIndex + 1}`;
                
                // Critical: Apply the photo now that we know the ID
                applySavedPhoto(studentId);
            }
        } catch (e) {
            console.error("Dashboard Sync Failed:", e);
        }
    }

    // --- 5. AUTHENTICATION LOGIC ---
    if (authForm) {
        authForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = authForm.querySelector('button[type="submit"]');
            const studentId = document.getElementById('student-id').value.trim();
            const passphrase = document.getElementById('passphrase').value.trim();
            
            submitBtn.innerText = "AUTHENTICATING...";
            submitBtn.disabled = true;

            try {
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

                if (validUser) {
                    // Save Session so refresh works
                    localStorage.setItem('active_operative_id', studentId);
                    loginView.style.display = 'none';
                    dashboardView.style.display = 'block';
                    fetchAndPopulateDashboard(studentId);
                } else {
                    alert("ACCESS DENIED");
                    submitBtn.innerText = "Authenticate";
                    submitBtn.disabled = false;
                }
            } catch (err) {
                alert("GATEWAY ERROR");
                submitBtn.disabled = false;
            }
        });
    }

    // --- 6. UPLOAD LOGIC ---
    if (avatarInput) {
        avatarInput.addEventListener('change', function() {
            const file = this.files[0];
            const currentActiveId = localStorage.getItem('active_operative_id');

            if (file && currentActiveId) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const base64Image = e.target.result;
                    localStorage.setItem(`photo_${currentActiveId}`, base64Image);
                    applySavedPhoto(currentActiveId);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- 7. LOGOUT LOGIC ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('active_operative_id');
            window.location.reload();
        });
    }
});