// client/js/lessons/lesson1.js

// Function to toggle the instructions modal
function toggleInstructionsModal(show) {
    const modal = document.getElementById('instructionsModal');
    if (show) {
        modal.classList.add('active');
    } else {
        modal.classList.remove('active');
    }
}

// Add event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const instructionsIconLight = document.getElementById('instructionsIconLight');
    const instructionsIconDark = document.getElementById('instructionsIconDark');

    if (instructionsIconLight) {
        instructionsIconLight.addEventListener('click', () => toggleInstructionsModal(true));
    }

    if (instructionsIconDark) {
        instructionsIconDark.addEventListener('click', () => toggleInstructionsModal(true));
    }
});