function openModal() {
    const nominal = document.getElementById('nominal').value;
    const pesan = document.getElementById('pesan').value.trim();

    if (!nominal || parseInt(nominal) <= 0) return alert('Nominal harus diisi.');
    if (!pesan) return alert('Pesan harus diisi.');

    document.getElementById('modal-nominal').textContent = 'Rp ' + parseInt(nominal).toLocaleString('id-ID');
    document.getElementById('modal-pesan').textContent = pesan;

    // Gunakan add/remove agar lebih pasti
    const overlay = document.getElementById('overlay');
    const sheet = document.getElementById('sheet');

    overlay.classList.remove('hidden');
    sheet.classList.remove('hidden');

    requestAnimationFrame(() => {
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-100', 'pointer-events-auto');

        sheet.classList.remove('translate-y-full');
        sheet.classList.add('translate-y-0');
    });
}

function closeModal() {
    const overlay = document.getElementById('overlay');
    const sheet = document.getElementById('sheet');

    overlay.classList.remove('opacity-100', 'pointer-events-auto');
    overlay.classList.add('opacity-0', 'pointer-events-none');

    sheet.classList.remove('translate-y-0');
    sheet.classList.add('translate-y-full');


    overlay.classList.add('hidden');
    sheet.classList.add('hidden');

}

async function doSubmit(event) {
    if (event) event.preventDefault();

    const nominal = document.getElementById('nominal').value;
    const pesan = document.getElementById('pesan').value.trim();

    try {
        const res1 = await fetch('/api/master-activity/pemasukan', {
            method: 'GET',
            credentials: 'include',
        });

        const data1 = await res1.json();

        if (!res1.ok) {
            notyf.error(data1.message);
            return; // hentikan jika gagal
        }

        const information_temp = data1.information_temp;

        // ✅ Gunakan backtick untuk template literal
        const res2 = await fetch(`/api/add-saving/${information_temp}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nominal, pesan }),
        });

        const data2 = await res2.json();

        if (res2.ok) {
            closeModal();
            notyf.success(data2.message);
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
            console.log(data2);
        } else {
            closeModal();
            notyf.error(data2.message);
        }

    } catch (err) {
        console.error(err);
        notyf.error('Terjadi kesalahan, coba lagi.');
    }
}

// async function doSubmit(event) {
//     if (event) event.preventDefault();

//     const nominal = document.getElementById('nominal').value;
//     const pesan = document.getElementById('pesan').value.trim();

//     // const params = new URLSearchParams({
//     //     type: 'pemasukan',
//     // });

//     // if (!nominal || parseInt(nominal) <= 0) return alert('Nominal harus diisi.');
//     // if (!pesan) return alert('Pesan harus diisi.');

//     try {
//         const res1 = await fetch('/api/master-activity/pemasukan', {
//             method: 'GET',
//             credentials: 'include',
//         });

//         const data1 = await res1.json();

//         if (res1.ok) {
//             const information_temp = data1.information_temp;

//             try {
//                 const res2 = await fetch('/api/add-saving/${information_temp}', {
//                     method: 'POST',
//                     credentials: 'include',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ nominal, pesan }),
//                 });

//                 const data2 = await res2.json();

//                 if (res2.ok) {
//                     notyf.success(data2.message);
//                     setTimeout(() => {
//                         window.location.href = '/dashboard';
//                     }, 1000);
//                 } else {
//                     notyf.error(data2.message);
//                 }
//             } catch (err) {
//                 console.error(err);
//             }
//         } else {
//             console.error(data1.message);
//         }
//     } catch (err) {
//         console.error(err);
//     }
// }