import { log } from "./utilities.js";
import { algodClient, getAddress } from "./algoUtils.js";


async function sendTransaction() {
  try {
    const accounts = await AlgoSigner.accounts({ ledger: 'TestNet' });
    const account = accounts[0];
    const params = await algodClient.getTransactionParams().do();
    const sender = account.address;
    const recipient = "R42P25CWZ23WITFSQHGZTYCACIUIZJVLQBKW57MB727QFP723NRBOJD5AM";
    const amount = Math.floor(Math.random() * 100000);
    const note = new TextEncoder().encode('Hello, Algorand!');

    const encoder = new TextEncoder();

    const suggestedTxParams = {
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

    log(`Trying to execute transaction from ${sender} to ${recipient} ...`);

    // appIndex: +document.getElementById('app-index').value,
    const txn = algosdk.makeApplicationNoOpTxnFromObject({
      from: sender,
      to: recipient,
      suggestedParams: { ...suggestedTxParams }
    });

    // Use the AlgoSigner encoding library to make the transactions base64
    let txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
    AlgoSigner.signTxn([{ txn: txn_b64 }]).then((d) => {
      log('Transaction executed successfully:', d);

      for (const key in d) {
        log(`${key}:`, d[key]);
      }
    }).catch((e) => { log(e); });

  } catch (err) {
    log('Error:', err);
  }
}

const mintNFTBtn = document.getElementById("mint-nft-btn");
mintNFTBtn.addEventListener("click", sendTransaction);
