const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount ?? 0);
}

document.addEventListener('DOMContentLoaded', async () => {
    const mainSavingsElement = document.getElementById('main-savings');
    const rayhanSavingsElement = document.getElementById('rayhan-savings');
    const syifaSavingsElement = document.getElementById('syifa-savings');

    // Cek element ada
    if (!mainSavingsElement || !rayhanSavingsElement || !syifaSavingsElement) {
        console.error('Element tidak ditemukan');
        return;
    }

    try {
        const res = await fetch('/api/savings', {
            method: 'GET',
            credentials: 'include'
        });

        const data = await res.json();

        if (res.ok) {
            mainSavingsElement.textContent = formatRupiah(data.total);
            rayhanSavingsElement.textContent = formatRupiah(data.rayhan);
            syifaSavingsElement.textContent = formatRupiah(data.syifa);
            console.log(data);
        } else {
            console.error(data.message);
        }
    } catch (err) {
        console.error('Gagal fetch savings:', err);
    }
});