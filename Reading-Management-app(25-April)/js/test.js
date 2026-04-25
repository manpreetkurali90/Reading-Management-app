document.addEventListener('DOMContentLoaded', () => {
    const shownewbook = document.getElementById('show-new-book');
    console.log('Test element:', shownewbook); // Should log the <ul> element

    if (shownewbook) {
        const li = document.createElement('li');
        li.textContent = 'Test Item';
        shownewbook.appendChild(li);
    } else {
        console.error('Element not found!');
    }
});