document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const alertBox = document.getElementById('alert'); // ← ganti jadi alertBox

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            alertBox.className = 'mb-4 p-3 rounded-lg text-sm bg-green-100 text-green-700';
            alertBox.textContent = data.message || 'Login berhasil';
            alertBox.classList.remove('hidden');
            setTimeout(() => {
                window.location.href = '/dashboard'; // ← sekarang bisa jalan
            }, 1000);
        } else {
            alertBox.className = 'mb-4 p-3 rounded-lg text-sm bg-red-100 text-red-700';
            alertBox.textContent = data.message || 'Login gagal';
            alertBox.classList.remove('hidden');
        }
    } catch (err) {
        console.error(err);
        alertBox.className = 'mb-4 p-3 rounded-lg text-sm bg-red-100 text-red-700';
        alertBox.textContent = 'Terjadi kesalahan saat menghubungi server';
        alertBox.classList.remove('hidden');
    }
});