'use strict';


//////////////////////////////////////////
// Select DOM elements
const generateButton = document.getElementById('generateColorsBTN');
const paletteContainer = document.querySelector('.paletteContainer');



///////////////////////////////////////////////////
// Event Listeners
document.addEventListener("DOMContentLoaded", generatePalette);
generateButton.addEventListener('click', generatePalette);
paletteContainer.addEventListener('click', copyToClipboard);



////////////////////////////////////////////////////
// Functions

// Copy Hex Code to Clipboard
function copyToClipboard(e){
    let hexCode;
    let iconImage;

    // If user clicked icon
    if(e.target.classList.contains('copy')){
        hexCode = e.target.closest('.infoBlock').querySelector('.hexCode').textContent;
        iconImage = e.target;
    }

    // If user clicked div
    if(e.target.classList.contains("color")){
        hexCode = e.target.closest('.colorBlock').querySelector('.hexCode').textContent;
        iconImage = e.target.closest('.colorBlock').querySelector('.copy');
    }

    if (hexCode && iconImage){
        navigator.clipboard.writeText(hexCode).then(() => {
            const originalSrc = iconImage.src;
            iconImage.src = 'img/check.svg';
            setTimeout(() => {
                iconImage.src = originalSrc;
            }, 1000);
        }).catch((err) => alert(err));
    }
}

// Generate 5 different colors
function generatePalette(){
    const colors = [];

    for(let i = 0; i < 5; i++){
        colors.push(generateColors());
    }

    updateColors(colors);
}

function updateColors(colors){
    // Select Color Blocks
    const colorBlocks = document.querySelectorAll('.colorBlock');

    colorBlocks.forEach((containerBlock, index) => {
        // Select Each Element to Display Color & Hex Code
        const dispColor = containerBlock.querySelector('.color');
        const displHexCode = containerBlock.querySelector('.hexCode');
        
        // Assign to Color var the Hex Code
        const color = colors[index];

        // Display Color to Palette
        dispColor.style.backgroundColor = color;

        // Display Hex Code to Palette
        displHexCode.textContent = color;
    });
}

// Generate a Hex Code by selecting randomly the digits from the pool
function generateColors(){
    // Pool of possible digits
    const digitsPool = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                        'A', 'B', 'C', 'D', 'E', 'F'];
    let color = '#';

    for(let i = 0; i < 6; i++){
        const pickRandomIndex = Math.floor(Math.random()*digitsPool.length);
        color += digitsPool[pickRandomIndex];
    }

    return color;
}