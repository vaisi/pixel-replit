
export let selectedColor;

// Function to generate a random neon color
function randomNeonColor() {
  const h = Math.floor(Math.random() * 360);
  const s = 100;
  const l = 50;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// Create a color palette
const colorPaletteContainer = document.querySelector('.color-palette-container');
const colorPalette = document.createElement('div');
colorPaletteContainer.appendChild(colorPalette);
colorPalette.className = 'color-palette';


// Generate a random neon color palette
for (let i = 0; i < 6; i++) {
  const color = randomNeonColor();
  const colorElement = document.createElement('div');
  colorElement.className = 'color';
  colorElement.style.backgroundColor = color;
  colorPalette.appendChild(colorElement);
  if (i === 0) selectColorFromPalette(colorElement);;

  // Add click event listener to select color
  colorElement.addEventListener('click', () => {
    const previousSelectedColor = document.querySelector('.selected-color');
    if (previousSelectedColor) {
      previousSelectedColor.classList.remove('selected-color');
    }
    selectColorFromPalette(colorElement);
  });
}

function selectColorFromPalette(colorElement) {
  colorElement.classList.add('selected-color');
  selectedColor = colorElement.style.backgroundColor;
}

