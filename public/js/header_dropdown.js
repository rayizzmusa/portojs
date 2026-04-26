const toggle = document.getElementById('accountToggle');
const dropdown = document.getElementById('dropdown');
const chevron = document.getElementById('chevron');

toggle.addEventListener('click', () => {
    const isHidden = dropdown.classList.toggle('hidden');
    chevron.style.transform = isHidden ? '' : 'rotate(180deg)';
});

document.addEventListener('click', (e) => {
    if (!document.getElementById('accountWrapper').contains(e.target)) {
        dropdown.classList.add('hidden');
        chevron.style.transform = '';
    }
});

