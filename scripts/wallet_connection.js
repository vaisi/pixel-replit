import { log, getAddress } from "./utilities.js";

//const algosdk = window.algosdk;
const baseServer = 'https://testnet-algorand.api.purestake.io/ps2'
const port = '';
const token = { 'X-API-Key': 'Iv8c1TBdZ05o30S0zaDAf1mFTYLGOgNe3glPkD2Z' }


const { Algodv2, kmd } = algosdk;

const algodClient = new algosdk.Algodv2(token, baseServer, port);
let indexerClient = new algosdk.Indexer(token, baseServer, port);


const connectWallet = async () => {
  try {
    const accounts = await AlgoSigner.connect();
    log("Connected to AlgoSigner!", accounts);
  } catch (error) {
    log(`Failed to connect to AlgoSigner: ${error}`);
  }
};

const disconnectWallet = async () => {
  try {
    await AlgoSigner.disconnect();
    log("Disconnected wallet from AlgoSigner.");
  } catch (error) {
    log("Failed to disconnect wallet from AlgoSigner:", error);
  }
};


// Show address of the connected wallet
const showAddress = async () => {
  const address = await getAddress();
  log(`Address: ${address}`);
};



async function showAccountInformation() {
  try {
    const address = await getAddress();
    log(`Account info for address  ${address}`);  
    const accountInfo = await algodClient.accountInformation(address).do();

    log('Account information:');
    for (const key in accountInfo) {
      log(`${key}:`, accountInfo[key]);
    }
  } catch (error) {
    log('Error getting account information:', error);
  }
}

const connectWalletBtn = document.getElementById("connect-wallet-btn");
connectWalletBtn.addEventListener("click", connectWallet);

const disconnectWalletBtn = document.getElementById("disconnect-wallet-btn");
disconnectWalletBtn.addEventListener("click", disconnectWallet);

const showAddressBtn = document.getElementById("show-address-btn");
showAddressBtn.addEventListener("click", showAddress);


const balanceBtn = document.getElementById("balance-btn");
balanceBtn.addEventListener("click", showAccountInformation);