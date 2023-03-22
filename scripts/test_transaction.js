import { algodClient, log, getAddress } from "./utilities.js";


async function sendTransaction() {
  try {
    const accounts = await AlgoSigner.accounts({ ledger: 'TestNet' });
    const account = accounts[0];
    const params = await algodClient.getTransactionParams().do();
    const sender = account.address;
    const recipient = "R42P25CWZ23WITFSQHGZTYCACIUIZJVLQBKW57MB727QFP723NRBOJD5AM";
    const amount = Math.floor(Math.random() * 1000);
    const note = new TextEncoder().encode('Hello, Algorand!');

    const encoder = new TextEncoder();

    const txn = {
      "from": sender.addr,
      "to": recipient,
      "amount": amount,
      "fee": params.fee,
      "firstRound": params.firstRound,
      "lastRound": params.lastRound,
      "genesisID": params.genesisID,
      "genesisHash": params.genesisHash,
      //type: 'pay',
      
    };

    log(`Trying to executa transaction from ${sender} to ${recipient}`);
    const signedTxn = algosdk.signTransaction(txn, account.sk);
    const tx = await algodClient.sendRawTransaction(signedTxn.blob).do();
    log('Transaction ID:', tx.txId);
  } catch (err) {
    log('Error:', err);
  }
}



const mintNFTBtn = document.getElementById("mint-nft-btn");
mintNFTBtn.addEventListener("click", sendTransaction);