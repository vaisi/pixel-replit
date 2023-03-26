import { log } from "./utilities.js";
import { algodClient, getAddress } from "./algoUtils.js";

const MICROALGO = 1000000;

let signedTxn;

async function sendTransaction() {
  try {
    const accounts = await AlgoSigner.accounts({ ledger: 'TestNet' });
    const account = accounts[0];
    const sender = account.address;
    const recipient = "R42P25CWZ23WITFSQHGZTYCACIUIZJVLQBKW57MB727QFP723NRBOJD5AM";
    const amount = 1 * MICROALGO;


    log(`Trying to execute transaction from ${sender} to ${recipient} ...`);

    // appIndex: +document.getElementById('app-index').value,
    const suggestedTxParams = await algodClient.getTransactionParams().do();
    const _txn = await algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: sender,
      to: recipient,
      amount: amount,
      type: "pay",
      suggestedParams: { ...suggestedTxParams }
    });

    // Use the AlgoSigner encoding library to make the transactions base64
    log("1");
    let txn_b64 = AlgoSigner.encoding.msgpackToBase64(_txn.toByte());    
    let signedTxn = await AlgoSigner.signTxn([{ txn: txn_b64 }]);
    log("3 signedTxn " + signedTxn);

    const encoder = new TextEncoder();
    const signedTxnByteArray = encoder.encode(signedTxn);
    
    log("3 signedTxn " + signedTxnByteArray);
    const { txId } = await algodClient.sendRawTransaction(signedTxnByteArray).do();
    log("4");
    const result = await algosdk.waitForConfirmation(algodClient, txId, 4);

    log(result);
    log(`Transaction Information: ${result.txn}`);
    //log(`Decoded Note: ${Buffer.from(result.txn.txn.note).toString()}`);

  } catch (err) {
    log('Error:', err);
  }
}

const mintNFTBtn = document.getElementById("mint-nft-btn");
mintNFTBtn.addEventListener("click", sendTransaction);
