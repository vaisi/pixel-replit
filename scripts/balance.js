
//import algosdk from './node_modules/algosdk';
 let algodClient = new algosdk.Algodv2(token, baseServer, port);

// Get Algo balance for connected account
const getAlgoBalance = async () => {
  try {
    const address = await getAddress();    
    const accountInfo = algodClient.accountInformation(address);

    log("Account balance: %d microAlgos", accountInfo.amount);

    const microAlgos = accountInfo.amount;
    const algos = microAlgos / 1000000;
    const balance = algos.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return balance;
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

async function showAlgoBalance() {
  const message = await getAlgoBalance();
  log(message);
}

const balanceBtn = document.getElementById("balance-btn");
balanceBtn.addEventListener("click", showAlgoBalance);
