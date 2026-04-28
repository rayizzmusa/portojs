const notyf = new Notyf({
    duration: 3000,
    position: {
        x: 'center',
        y: 'top'
    },
    types: [
        {
            type: 'success',
            background: '#1D4ED8',
            message: '<i class="fa-solid fa-check"></i> '
        },
        {
            type: 'error',
            background: '#ef4444',
            message: '<i class="fa-solid fa-xmark"></i> '
        }
    ]
});

window.notyf = notyf;