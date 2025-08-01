function setupFileDrop(drop_zone,file_input){
    const dropZone = document.querySelector(drop_zone);
    const fileInput = dropZone.querySelector(file_input);

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');

        const files = e.dataTransfer.files;
        fileInput.files = files;

        // Trigger change event for Active Storage
        const event = new Event('change', { bubbles: true });
        fileInput.dispatchEvent(event);
    });

    // Optional: Make the entire drop zone clickable
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });
}

//
// Exports (Global Namespace)
//
window.setupFileDrop = setupFileDrop;
