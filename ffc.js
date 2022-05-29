const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const EvmChains = window.EvmChains;
const Fortmatic = window.Fortmatic;
var web3Modal
var provider;
var selectedAccount;

var web3;

async function initWalletDialog() {

    console.log("Initializing example");
    console.log("WalletConnectProvider is", WalletConnectProvider);
   
    const providerOptions = {

      walletconnect: {
        
        package: WalletConnectProvider,
        options: {
          infuraId: "b595e5c110b1427e80d92413327ad432",
        }
      },
      binancechainwallet: {
        package: true
      },
      fortmatic: {
        package: Fortmatic,
        options: {
          key: "pk_test_391E26A3B43A3350"
        }
      }
    };
    web3Modal = new Web3Modal({
      cacheProvider: false, // optional
      providerOptions, // required
      theme: "dark"
    });
    web3Modal.clearCachedProvider();
    // await onConnect();
  }

  function ToggleWeb3Modal(){
    web3Modal._toggleModal();
  }

  async function onConnect() {

    console.log("Opening a dialog", web3Modal);
    try {
      provider = await web3Modal.connect();
    } catch(e) {
      console.log("Could not get a wallet connection", e);
      return;
    }
    console.log(provider);
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
    //   fetchAccountData();
    });
  
    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
    //   fetchAccountData();
    });
  
    // Subscribe to networkId change
    provider.on("networkChanged", (networkId) => {
    //   fetchAccountData();
    });
    
    await fetchAccountData();
  }

  async function fetchAccountData(){
    ToggleWeb3Modal();
    web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];
  }
