document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const userNameElement = document.getElementById('user-name');
    const userNameElement2 = document.getElementById('user-name2');

    if (!token) {
        window.location.href = '/';
        return;
    }

    try {
        const res = await fetch("/api/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        console.log("Data dari server:", data); // Debugging: Intip isi data

        if (res.ok) {
            // Gunakan optional chaining (?.) atau fallback untuk cegah error undefined
            const namaTampil = data.username || (data.user && data.user.username) || 'User';
            userNameElement.textContent = namaTampil;
            userNameElement2.textContent = namaTampil;
        } else {
            console.error("Server Error:", data.message);
            // Optional: Jika token expired/invalid, hapus dan redirect
            // localStorage.removeItem('token');
            // window.location.href = '/';
        }
    } catch (err) {
        console.error('Gagal fetch data:', err);
        userNameElement.textContent = 'Error Loading Name';
    }
});