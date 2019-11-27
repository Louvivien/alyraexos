const dapp = {};


// Enable MetaMask on this app and get the current address back

async function enableMetaMask() {

    if (window.ethereum) {
    
      try {
    
        const [ address ] = await window.ethereum.enable();
    
        return address;
    
      } catch (err) {
    
        throw err;
    
      }
    
    } else {
    
      alert('This super awesome app need MetaMask to work. Install it and come back');
    
      throw new Error('Ethereum is not available here');
    
    }
    
    }


// Setup the dapp with MetaMask

async function createMetaMaskDapp() {

    try {
    
      const address = await enableMetaMask();
    
      const provider = ethers.providers.Web3Provider(window.ethereum);
    
      const signer = provider.getSigner();
    
      dapp = { address, provider, signer };
    
    } catch(err) {
    
      console.error(err);
    
    }


// Setup the dapp with Custom HDWallet

async function createHDWalletDapp() {

    try {
    
      const provider = ethers.getDefaultProvider('ropsten');
    
      const signer = ethers.Wallet.createRandom();
    
      const address = await signer.getAddress();
    
      dapp = { address, provider, signer };
    
    } catch(err) {
    
      console.error(err);
    
    }
    
    }
    







    
    }

