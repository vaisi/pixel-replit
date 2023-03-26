import { log } from "./utilities.js";
import { algodClient, getAddress } from "./algoUtils.js";


const connectWallet = async () => {
  try {
    const accounts = await AlgoSigner.connect();
    const address = await getAddress();
    log("Connected with wallet: ", address);
  } catch (error) {
    log(`Failed to connect to AlgoSigner: ${error}`);
  }
};

const disconnectWallet = async () => {
  try {
    algodClient.disconnect();
    log("Wallet disconnected");
  } catch (error) {
    log("Failed to disconnect wallet:", error);
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

    const algoBalance = accountInfo.amount / 1000000;
    log(`Account balance: ${algoBalance} Algos`);

    //for (const key in accountInfo) {
    //  log(`${key}:`, accountInfo[key]);
    //}
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