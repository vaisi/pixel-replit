

// Function for logging output to the text box
export const log = (...messages) => {
  let message = '';
  for (let i = 0; i < messages.length; i++) {
    message += messages[i] + ' ';
  }
  document.getElementById('output').value += message.trim() + '\n';
};


// Get address of the connected wallet
export const getAddress = async () => {
  try {
    const accounts = await AlgoSigner.accounts({ ledger: 'TestNet' });
    return accounts[0].address;
  } catch (error) {
    log("Failed to retrieve address:", error);
    return "";
  }
};