const butInstall = document.getElementById('buttonInstall');

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // prevent the default from coming up?
    event.preventDefault();
    // save event so it can be use later
    let deferredPrompt = event;
    // display the install button
    butInstall.style.display = 'block';

    // TODO: Implement a click event handler on the `butInstall` element
    butInstall.addEventListener('click', async () => {
        // show the prompt to user
        deferredPrompt.prompt();
        // wait for user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // reset deferred prompt 
        deferredPrompt = null;
        // hide the install button after the prompt comes up
        butInstall.style.display = 'none';
    });
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // hide install button after app is installed
    butInstall.style.display = 'none';
});
