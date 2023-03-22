/*

const mintNFT = async () => {
  try {
    // Connect to the wallet
    const accounts = await AlgoSigner.accounts({ ledger: 'TestNet' });
    if (accounts.length === 0) {
      throw new Error("No Algorand accounts found");
    }
    // Get the connected wallet's Algo balance
    const address = accounts[0].address;

    // Get the balance of the account
    const accountInfo = await AlgoSigner.accountInformation(address);
    const accountBalance = accountInfo.amount / 1000000;
    log(`Account balance: ${accountBalance} Algos`);

    // Check if the account has enough balance to mint the NFT
    if (accountBalance < 1) {
      log("Error: Account balance is not enough to mint NFT.");
      return;
    }

    // Create a new NFT
    const nft = {
      name: "My NFT",
      symbol: "NFT",
      total: 1,
      decimals: 0,
      unitName: "NFT",
      url: "https://my-nft.com",
    };

    // Mint the NFT
    const txParams = await AlgoSigner.algod({
      ledger: "TestNet",
      path: "/v2/transactions/params",
    });
    const txn = {
      ...txParams,
      fee: 1000,
      flatFee: true,
      type: "appl",
      from: account.address,
      appIndex: 12345678, // Replace with your application ID
      appOnComplete: 0,
      appArgs: [
        Uint8Array.from(Buffer.from("mint", "utf-8")),
        Uint8Array.from(Buffer.from(JSON.stringify(nft), "utf-8")),
      ],
      note: Uint8Array.from(Buffer.from("Mint NFT", "utf-8")),
    };
    const signedTxn = await AlgoSigner.sign(txn);
    const tx = await AlgoSigner.sendRawTransaction(signedTxn.blob);
    log(`Transaction ID: ${tx.txId}`);

    // Show success message
    log("NFT minted successfully.");
  } catch (error) {
    log(`Error: ${error.message}`);
  }
};


const mintNFTBtn = document.getElementById("mint-nft-btn");
mintNFTBtn.addEventListener("click", mintNFT);
*/