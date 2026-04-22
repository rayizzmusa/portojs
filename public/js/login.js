document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const alert = document.getElementById('alert');

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            alert.className = 'mb-4 p-3 rounded-lg text-sm bg-green-100 text-green-700';
            alert.textContent = 'Login berhasil! Mengalihkan...';
            alert.classList.remove('hidden');
            localStorage.setItem('token', data.token);
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        } else {
            alert.className = 'mb-4 p-3 rounded-lg text-sm bg-red-100 text-red-700';
            alert.textContent = data.message || 'Login gagal';
            alert.classList.remove('hidden');
        }
    } catch (err) {
        console.error(err);
        alert.className = 'mb-4 p-3 rounded-lg text-sm bg-red-100 text-red-700';
        alert.textContent = 'Terjadi kesalahan saat menghubungi server';
        alert.classList.remove('hidden');
    }
});