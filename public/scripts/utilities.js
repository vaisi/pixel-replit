export const CELL_DEFAULT_COLOR = 'rgb(25, 26, 27)';


// Function for logging output to the text box
export const log = (...messages) => {
  let message = '';
  for (let i = 0; i < messages.length; i++) {
    message += messages[i] + ' ';
  }
  const output = document.getElementById("output");
  output.value += message.trim() + '\n';
  output.scrollTop = output.scrollHeight;
};