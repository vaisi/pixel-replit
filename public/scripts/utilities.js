
//const algosdk = window.algosdk;
export const baseServer = 'https://testnet-algorand.api.purestake.io/ps2'
export const port = '';
export const token = { 'X-API-Key': 'Iv8c1TBdZ05o30S0zaDAf1mFTYLGOgNe3glPkD2Z' }


const { Algodv2, kmd } = algosdk;

export const algodClient = new algosdk.Algodv2(token, baseServer, port);
export let indexerClient = new algosdk.Indexer(token, baseServer, port);

export const CELL_DEFAULT_COLOR = 'rgb(25, 26, 27)';


// Function for logging output to the text box
export const log = (...messages) => {
  let message = '';
  for (let i = 0; i < messages.length; i++) {
    message += messages[i] + ' ';
  }
  // const output = document.getElementById("output");
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