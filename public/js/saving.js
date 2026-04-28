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

    try {
        const res = await fetch('/api/last-activity', {
            method: 'GET',
            credentials: 'include'
        });

        const data = await res.json();

        if (res.ok && data.activities) {
            const activitiesElement = document.getElementById('last-activity');
            if (activitiesElement) {
                activitiesElement.innerHTML = data.activities.map((activity, index, arr) => {
                    const dateObj = new Date(activity.created_at);

                    const date = dateObj.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    });

                    const time = dateObj.toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit'
                    }).replace('.', ':');

                    return `
                    <div class="flex items-start justify-between gap-4 
                        ${index < arr.length - 1 ? 'pb-4 border-b border-blue-200 mb-4' : ''}">
                        <div class="flex items-start gap-3">
                            <div class="w-8 h-8 bg-blue-700 bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg class="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path d="M12 22c1.1 0 2-.9 2-2H10c0 1.1.9 2 2 2zm6-6V11c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                                </svg>
                            </div>

                            <p class="text-blue-800 text-sm font-medium leading-snug">
                                ${activity.activity_message}
                            </p>
                        </div>

                        <p class="text-blue-500 text-xs text-right whitespace-nowrap mt-0.5">
                            ${date}<br/>${time}
                        </p>
                    </div>
                `;
                }).join('');
            } else {
                console.error('Element tidak ditemukan');
            }
        } else {
            console.error('Data tidak ditemukan');
        }
    } catch (err) {
        console.error('Gagal fetch last activity:', err);
    }
});