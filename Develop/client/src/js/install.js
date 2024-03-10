const butInstall = document.getElementById('buttonInstall');

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    let deferredPrompt = event;
    butInstall.style.display = 'block';

    // TODO: Implement a click event handler on the `butInstall` element
    butInstall.addEventListener('click', async () => {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
        butInstall.style.display = 'none';
    });
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    butInstall.style.display = 'none';
});
