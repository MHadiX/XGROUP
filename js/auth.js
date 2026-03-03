document.addEventListener("DOMContentLoaded", () => {
    // --- UI Elements ---
    const authForm = document.getElementById('auth-form');
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const avatarInput = document.getElementById('avatar-upload');
    const imagePreview = document.getElementById('image-preview');
    const placeholder = document.getElementById('upload-placeholder');
    const logoutBtn = document.getElementById('logout-btn');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navElements = document.getElementById('nav-elements');

    const sheetId = "199lSNROkokVMpJYxX1kvim--LrqlBZd_rgjhwZQ9trk";

    // --- 1. MOBILE NAV LOGIC ---
    if (mobileMenuBtn && navElements) {
        mobileMenuBtn.addEventListener('click', () => {
            navElements.classList.toggle('show');
        });
    }

    // --- 2. PHOTO LOGIC ---
    const applySavedPhoto = (studentId) => {
        if (!studentId || !imagePreview) return;
        const savedPhoto = localStorage.getItem(`photo_${studentId}`);
        if (savedPhoto) {
            imagePreview.style.backgroundImage = `url(${savedPhoto})`;
            imagePreview.style.backgroundSize = "cover";
            imagePreview.style.border = "2px solid var(--brand-red)";
            if (placeholder) placeholder.style.display = 'none';
        } else {
            imagePreview.style.backgroundImage = 'none';
            imagePreview.style.border = "2px dashed var(--border-subtle)";
            if (placeholder) placeholder.style.display = 'block';
        }
    };

    // --- 3. THE CORE DATA ENGINE (Fetching from Progress Table) ---
    // --- Replace your fetchAndPopulateDashboard function with this ---
async function fetchAndPopulateDashboard(username) {
    try {
        // 1. Target the "Final" sheet
        const statsUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Final`;
        
        const statsRes = await fetch(statsUrl);
        const statsText = await statsRes.text();
        const jsonMatch = statsText.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/);
        
        if (!jsonMatch) return;

        const statsRows = JSON.parse(jsonMatch[1]).table.rows;
        let allStudents = [];

        statsRows.forEach(row => {
            // Mapping: Col A(0): Name, Col B(1): THM ID, Col D(3): Rooms, Col E(4): Points
            if (row.c && row.c[1] && row.c[1].v !== null) {
                allStudents.push({
                    name: row.c[0] ? String(row.c[0].v).trim() : 'Unknown',
                    thmId: String(row.c[1].v).trim(), // This is our new comparison key
                    rooms: row.c[3] ? (parseInt(row.c[3].v) || 0) : 0,
                    points: row.c[4] ? (parseInt(row.c[4].v) || 0) : 0
                });
            }
        });

        // 2. Sort by points for Ranking
        allStudents.sort((a, b) => b.points - a.points);

        // 3. COMPARE LOGIN USERNAME WITH THM ID
        // We trim and lowercase both sides to ensure a perfect match
        const searchKey = username.toLowerCase().trim();
        const studentIndex = allStudents.findIndex(s => 
            s.thmId.toLowerCase() === searchKey
        );

        const stats = allStudents[studentIndex];

        if (stats) {
            // 4. Inject into Profile UI
            document.getElementById('display-name').innerText = stats.name;
            document.getElementById('display-id').innerText = stats.thmId; // Showing THM ID as the main ID
            document.getElementById('display-thm').innerText = stats.thmId;
            document.getElementById('stat-rooms').innerText = stats.rooms;
            document.getElementById('stat-points').innerText = stats.points;
            
            const rankEl = document.getElementById('stat-rank');
            if (rankEl) rankEl.innerText = `#${studentIndex + 1}`;
            
            applySavedPhoto(username);
            console.log(`[OK] Match found! Username "${username}" matched THM ID "${stats.thmId}"`);
        } else {
            console.error(`[NOT FOUND] No THM ID matching "${username}" found in the 'Final' sheet.`);
            console.log("THM IDs found in sheet:", allStudents.map(s => s.thmId));
        }
    } catch (e) {
        console.error("[CRITICAL] Dashboard Sync Failed:", e);
    }
}

    // --- 4. SESSION PERSISTENCE (Handles Reloads) ---
    const activeSessionId = localStorage.getItem('active_operative_id');
    if (activeSessionId) {
        loginView.style.display = 'none';
        dashboardView.style.display = 'block';
        applySavedPhoto(activeSessionId);
        fetchAndPopulateDashboard(activeSessionId);
    }

    // --- 5. LOGIN HANDSHAKE ---
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
                    if (row.c && row.c[0] && String(row.c[0].v).trim().toLowerCase() === studentId.toLowerCase() && (row.c[1] ? String(row.c[1].v).trim() : '') === passphrase) {
                        validUser = true; break;
                    }
                }

                if (validUser) {
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
                alert("DATABASE OFFLINE");
                submitBtn.disabled = false;
            }
        });
    }

    // --- 6. PHOTO UPLOAD ---
    if (avatarInput) {
        avatarInput.addEventListener('change', function() {
            const file = this.files[0];
            const currentId = localStorage.getItem('active_operative_id');
            if (file && currentId) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    localStorage.setItem(`photo_${currentId}`, e.target.result);
                    applySavedPhoto(currentId);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- 7. LOGOUT ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('active_operative_id');
            window.location.reload();
        });
    }
});