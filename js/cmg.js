const NETWORK_ID = 56
var NFT_PRICE = null
var PRESALE_PRICE = null
var MAX_SUPPLY = null
var MAX_PRESALE_SUPPLY = null
var contract
var accounts
var web3
var spend;
var balance
var tokenbalance
var available
var mynft;
var currentAddr = null;
var balanceNFT
const minerAddress = '0xEfca24b76aBbd794112b02B7293b59f7Ca3A23F5'

const tokenAddress = '0xfA75692e171fe75BcA9D8B2150f4831E30269312' // mainnet busd
//'0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7' //testnet busd
const contractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_MINT_PER_TX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_PRESALE_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"a1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"a2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"a3","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_a","type":"address[]"},{"internalType":"uint256[]","name":"_amount","type":"uint256[]"}],"name":"editWhitelistReserved","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initial_price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mintPresale","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mintReserved","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mintToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mintWhitelist","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presaleActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reserved","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_a","type":"address[]"}],"name":"setAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"val","type":"bool"}],"name":"setPresaleActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"val","type":"bool"}],"name":"setSaleActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"val","type":"bool"}],"name":"setWhitelistActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token_BUSD","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"tokensOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"whitelistActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelistReserved","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawTeam","outputs":[],"stateMutability":"payable","type":"function"}]
const tokenAbi = [{"constant":false,"inputs":[],"name":"disregardProposeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"assetProtectionRole","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"r","type":"bytes32[]"},{"name":"s","type":"bytes32[]"},{"name":"v","type":"uint8[]"},{"name":"to","type":"address[]"},{"name":"value","type":"uint256[]"},{"name":"fee","type":"uint256[]"},{"name":"seq","type":"uint256[]"},{"name":"deadline","type":"uint256[]"}],"name":"betaDelegatedTransferBatch","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sig","type":"bytes"},{"name":"to","type":"address"},{"name":"value","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"seq","type":"uint256"},{"name":"deadline","type":"uint256"}],"name":"betaDelegatedTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"initializeDomainSeparator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"unfreeze","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newSupplyController","type":"address"}],"name":"setSupplyController","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"target","type":"address"}],"name":"nextSeqOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newAssetProtectionRole","type":"address"}],"name":"setAssetProtectionRole","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"freeze","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newWhitelister","type":"address"}],"name":"setBetaDelegateWhitelister","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"decreaseSupply","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"isWhitelistedBetaDelegate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"whitelistBetaDelegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_proposedOwner","type":"address"}],"name":"proposeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"increaseSupply","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"betaDelegateWhitelister","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"proposedOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"unwhitelistBetaDelegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"wipeFrozenAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"EIP712_DOMAIN_HASH","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"isFrozen","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"supplyController","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reclaimBUSD","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"currentOwner","type":"address"},{"indexed":true,"name":"proposedOwner","type":"address"}],"name":"OwnershipTransferProposed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldProposedOwner","type":"address"}],"name":"OwnershipTransferDisregarded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"}],"name":"AddressFrozen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"}],"name":"AddressUnfrozen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"}],"name":"FrozenAddressWiped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldAssetProtectionRole","type":"address"},{"indexed":true,"name":"newAssetProtectionRole","type":"address"}],"name":"AssetProtectionRoleSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"SupplyIncreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"SupplyDecreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldSupplyController","type":"address"},{"indexed":true,"name":"newSupplyController","type":"address"}],"name":"SupplyControllerSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"seq","type":"uint256"},{"indexed":false,"name":"fee","type":"uint256"}],"name":"BetaDelegatedTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldWhitelister","type":"address"},{"indexed":true,"name":"newWhitelister","type":"address"}],"name":"BetaDelegateWhitelisterSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"newDelegate","type":"address"}],"name":"BetaDelegateWhitelisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldDelegate","type":"address"}],"name":"BetaDelegateUnwhitelisted","type":"event"}]
var tokenContract;
function metamaskReloadCallback() {
  window.ethereum.on('accountsChanged', (accounts) => {
    document.getElementById("web3_message").textContent = "Accounts changed, realoading...";
    window.location.reload()
  })
  window.ethereum.on('networkChanged', (accounts) => {
    document.getElementById("web3_message").textContent = "Network changed, realoading...";
    window.location.reload()
  })
}

const getAccounts = async () => {
  metamaskReloadCallback()
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" })
    resolve(web3)
  } catch (error) {
    console.log(error)
  }
}

const getWeb3 = async () => {
  return new Promise((resolve, reject) => {
    if (document.readyState == "complete") {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum)
        resolve(web3)
      } else {
        reject("must install MetaMask")
        document.getElementById("web3_message").textContent = "Error: Please install Metamask";
      }
    } else {
      window.addEventListener("load", async () => {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum)
          resolve(web3)
        } else {
          reject("must install MetaMask")
          document.getElementById("web3_message").textContent = "Error: Please install Metamask";
        }
      });
    }
  });
};

function handleRevertError(message) {
  alert(message)
}

async function getRevertReason(txHash) {
  const tx = await web3.eth.getTransaction(txHash)
  await web3.eth
    .call(tx, tx.blockNumber)
    .then((result) => {
      throw Error("unlikely to happen")
    })
    .catch((revertReason) => {
      var str = "" + revertReason
      json_reason = JSON.parse(str.substring(str.indexOf("{")))
      handleRevertError(json_reason.message)
    });
}

const getContract = async (web3) => {
 // const response = await fetch("./contracts/MinerGlobal.json");
  //const data = await response.json();

  const netId = await web3.eth.net.getId();
  //const deployedNetwork = data.networks[netId];
  tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
  contract = new web3.eth.Contract(contractAbi, minerAddress);
 /* contract = new web3.eth.Contract(
    data.abi,
    deployedNetwork && deployedNetwork.address
  );*/
  return contract
}

async function connectWallet() {
  getAccounts()
}

async function loadAccount() {

  accounts = await web3.eth.getAccounts()
  balance = await contract.methods.balanceOf(accounts[0]).call()
  balanceNFT = await contract.methods.tokensOfOwner(accounts[0]).call()
 
  for (let e = 0; e  < balanceNFT.length; e++) {
    imgURL= "http://157.245.126.14/" + balanceNFT[e]
    axios.get( imgURL )
       .then( (response) => {
         // función que se ejecutará al recibir una respuesta
        var nftsMis = response.data.image
        var nftrango = response.data.attributes[13].value
      //    console.log(nftrango)

        //console.log(nftsMis)
        const nftdiv = document.getElementById("card-list")
        const insertarnft = document.createElement("li")
        insertarnft.innerHTML = `                        
        <img src="${nftsMis}" alt="Psychopomp" />
    <div class="card-description">
        <h2>Rango ${nftrango}</h2>
        <p></p>
    </div>`
    nftdiv.appendChild(insertarnft)
       })
       .catch(function (error) {
         // función para capturar el error
         console.log(error);
       })
  }
  

  tokenContract.methods.balanceOf(accounts[0]).call().then(userBalance => {
    let amt = web3.utils.fromWei(userBalance);
    
  

  
    document.getElementById("user-balance").textContent = roundNum(amt);
    // calcNumTokens(roundNum(amt)).then(usdValue => {
    //     $('#user-balance-usd').html(roundNum(usdValue))
    // })
}).catch((err) => {
    console.log(err)
});

  tokenContract.methods.allowance(accounts[0], minerAddress).call().then(result => {
    spend = web3.utils.fromWei(result)
    if (spend > 0 ) {
     // alert(spend)
    }
  }).catch((err) => {
    console.log(err)
  });


  //mynft = await contract.methods.setBaseURI(accounts[0]).call()
  console.log(mynft)
  document.getElementById("mynft").textContent = mynft
  document.getElementById("web3_message").textContent = "Connected"
  document.getElementById("connect_button").style.display = "none"
  document.getElementById("nft_balance").textContent = "You have " + balance + " Crocs"
}


async function loadDapp() {
  document.getElementById("web3_message").textContent = "Connecting..."
  var awaitWeb3 = async function () {
    web3 = await getWeb3()
    web3.eth.net.getId((err, netId) => {
      if (netId == NETWORK_ID) {
        var awaitContract = async function () {
          contract = await getContract(web3);
          NFT_PRICE = await contract.methods.price().call()
          MAX_SUPPLY = await contract.methods.MAX_SUPPLY().call()
          MAX_PRESALE_SUPPLY = await contract.methods.MAX_PRESALE_SUPPLY().call()
          total_mint = await contract.methods.totalSupply().call()
          available = MAX_SUPPLY - total_mint
          available_presale = MAX_PRESALE_SUPPLY - total_mint
          if (document.getElementById("total_mint"))
            document.getElementById("total_mint").textContent = available + "/" + MAX_SUPPLY + " available"
          if (document.getElementById("total_mint_presale"))
            document.getElementById("total_mint_presale").textContent = available_presale + "/" + MAX_PRESALE_SUPPLY + " available"
          if (document.getElementById("price"))
            document.getElementById("price").textContent = "Price: " + web3.utils.fromWei(NFT_PRICE) + " CMG"
          if (document.getElementById("presale_price"))
            document.getElementById("presale_price").textContent = "Presale Price: " + web3.utils.fromWei(PRESALE_PRICE) + " ETH"
          web3.eth.getAccounts(function (err, accounts) {
            if (err != null)
              console.error("An error occurred: " + err);
            else if (accounts.length == 0)
              console.log("User is not logged in to MetaMask");
            else {
              loadAccount()
            }
          });
        };
        awaitContract();
      } else {
        document.getElementById("web3_message").textContent = "Please connect to Binance smart chain";
      }
    });
  };
  awaitWeb3();
}

loadDapp()

document.getElementById("web3_message").textContent = "Please connect to Metamask"

/* SALE */

const mint = async () => {
  let mint_amount = document.getElementById("mint_amount").value

  const result = await contract.methods.mintToken(mint_amount)
    .send({ from: accounts[0] })
    .on('transactionHash', function (hash) {
      document.getElementById("web3_message").textContent = "Minting...";
    })
    .on('receipt', function (receipt) {
      document.getElementById("web3_message").textContent = "Success! Minting finished.";
    })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
}

/* PRESALE */

const mintPresale = async () => {
  let mint_amount = document.getElementById("mint_amount").value
  const result = await contract.methods.mintPresale(mint_amount)
    .send({ from: accounts[0], gas: 0, value: PRESALE_PRICE * mint_amount })
    .on('transactionHash', function (hash) {
      document.getElementById("web3_message").textContent = "Minting...";
    })
    .on('receipt', function (receipt) {
      document.getElementById("web3_message").textContent = "Success! Minting finished.";
    })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
}

/* Whitelist */

const mintWhitelist = async () => {
  let mint_amount = document.getElementById("mint_amount").value
  const result = await contract.methods.mintWhitelist(mint_amount)
    .send({ from: accounts[0], gas: 0, value: NFT_PRICE * mint_amount })
    .on('transactionHash', function (hash) {
      document.getElementById("web3_message").textContent = "Minting...";
    })
    .on('receipt', function (receipt) {
      document.getElementById("web3_message").textContent = "Success! Minting finished.";
    })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
}

/* Owner */

const mintReserved = async () => {
  let mint_amount = document.getElementById("mint_amount").value
  const result = await contract.methods.mintReserved(mint_amount)
    .send({ from: accounts[0], gas: 0, value: 0 })
    .on('transactionHash', function (hash) {
      document.getElementById("web3_message").textContent = "Minting...";
    })
    .on('receipt', function (receipt) {
      document.getElementById("web3_message").textContent = "Success! Minting finished.";
    })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
}

const editPresaleReserved = async () => {
  const result = await contract.methods.editPresaleReserved(["0xA", "0xB"], [0, 0])
    .send({ from: accounts[0], gas: 0, value: 0 })
    .on('transactionHash', function (hash) {
      document.getElementById("web3_message").textContent = "Minting...";
    })
    .on('receipt', function (receipt) {
      document.getElementById("web3_message").textContent = "Success! Minting finished.";
    })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
}

const setPresaleActive = async () => {
  const result = await contract.methods.setPresaleActive(true)
    .send({ from: accounts[0], gas: 0, value: 0 })
    .on('transactionHash', function (hash) {
      document.getElementById("web3_message").textContent = "Minting...";
    })
    .on('receipt', function (receipt) {
      document.getElementById("web3_message").textContent = "Success! Minting finished.";
    })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
}
function getBalance(callback) {
  contract.methods.getBalance().call().then(result => {
    callback(result);
  }).catch((err) => {
    console.log(err)
  });
}

const setSaleActive = async () => {
  const result = await contract.methods.setSaleActive(true)
    .send({ from: accounts[0], gas: 0, value: 0 })
    .on('transactionHash', function (hash) {
      document.getElementById("web3_message").textContent = "Minting...";
    })
    .on('receipt', function (receipt) {
      document.getElementById("web3_message").textContent = "Success! Minting finished.";
    })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
}

const setBaseURI = async () => {
  const result = await contract.methods.setBaseURI("http://")
    .send({ from: accounts[0], gas: 0, value: 0 })
    .on('transactionHash', function (hash) {
      document.getElementById("web3_message").textContent = "Minting...";
    })
    .on('receipt', function (receipt) {
      document.getElementById("web3_message").textContent = "Success! Minting finished.";
    })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
}

const setPrice = async () => {
  const result = await contract.methods.setPrice("0")//(10000000)
    .send({ from: accounts[0], gas: 0, value: 0 })
    .on('transactionHash', function (hash) {
      document.getElementById("web3_message").textContent = "Minting...";
    })
    .on('receipt', function (receipt) {
      document.getElementById("web3_message").textContent = "Success! Minting finished.";
    })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
}

const setAddresses = async () => {
  const result = await contract.methods.setAddresses(
    [
      "0x707e55a12557E89915D121932F83dEeEf09E5d70",
      "0x707e55a12557E89915D121932F83dEeEf09E5d70",
      "0x707e55a12557E89915D121932F83dEeEf09E5d70"
    ]
  )
    .send({ from: accounts[0], gas: 0, value: 0 })
    .on('transactionHash', function (hash) {
      document.getElementById("web3_message").textContent = "Minting...";
    })
    .on('receipt', function (receipt) {
      document.getElementById("web3_message").textContent = "Success! Minting finished.";
    })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
}

const withdrawTeam = async () => {
  const result = await contract.methods.withdrawTeam("110")
    .send({ from: accounts[0], gas: 0, value: 0 })
    .on('transactionHash', function (hash) {
      document.getElementById("web3_message").textContent = "Minting...";
    })
    .on('receipt', function (receipt) {
      document.getElementById("web3_message").textContent = "Success! Minting finished.";
    })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
}

const editWhitelistReserved = async () => {
  const result = await contract.methods.editWhitelistReserved(
    [
      "0xe1A308d193cf262090108B028840174Fb2e7E20a",
      "0x46E41eaac194fB00f88B2D27765bF31cc2F1a707",
      "0x9c3211d23b63E4D9784600D5770540268DdB6372",
      "0x4800e1dc56Dd78d9b071afbd0e90B06862516132",
      "0x6B47cB1065a81B45784776bb5F85456fd8431e31",
      "0x617aF4A7D97FE1C83B2A383713B5FCCF0D75F39C",
      "0x971257beA317043f6aA786F5b88d0142e524305e",
      "0xb8296ADf724315572Fd0283bA13967F78e3D17D7",
      "0x78C0Fa5FcFa30d5f222d65B469EB1695d7f0724d",
      "0x564f3A7B17F8744316cE393BDF1e2535EA0B2A47",
      "0x73670ba1814a1e06E31e78bA4a4bB77293cf37D6",
      "0x93e00bb056Eb95Fa4929573F7EE0A3F1a9a5469e",
      "0x75BAa4C13f45923d0D712b2a8Ff0330a2DCD0c96",
      "0x78C9DDf6cc304D01d56eFEAf6e3489d5be5a2ded",
      "0x6bc9922A4cf67651a2CA650e868219Cd619ed31D",
      "0x548010d30282A928165Aa6D2BDAA12F59e77785B",
      "0x3580b8b357619af739531cf1ddf767322b2deffc",
      "0xE4D2737E03dDDf7B25f5e6A07d934B56fBbAE1C2",
      "0x9b166014f671e713e67b19fe91a692326086814b",
      "0x1660D013cDe152A73Fac3699e8745F5412A4E6b9",
      "0xe4a3051f00ceb480fbf2f3917878bbbd64644bd6",
      "0x37ae2f47dfbc57e3b4f4aeb53ff1687ccf3ca3a2",
      "0x023Cd3EF787056CE757AE079aCb49255cf95C194",
      "0x58955980b61b65bfa6a6738ce146e575274af34b",
      "0x09A31e9eA6490991995d4EceC3C5748B993064fd",
      "0xCCCd5C571Ab86590227123039218238d5B88D19c",
      "0x730bF3B67090511A64ABA060FbD2F7903536321E",
      "0x66e1aa2125b255B63f7198F17ca5AFCf5e842449",
      "0x75E82F64916bb536F8e27f6457Ae5C4Cc21BD677",
      "0x1a02764a8531039d31ca05aef09ecdaed5b76873"
    ],
    [
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      1,
      1,
      2,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      2,
      1
    ]
  )
    .send({ from: accounts[0], gas: 0, value: 0 })
    .on('transactionHash', function (hash) {
      document.getElementById("web3_message").textContent = "Minting...";
    })
    .on('receipt', function (receipt) {
      document.getElementById("web3_message").textContent = "Success! Minting finished.";
    })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
}

const setWhitelistActive = async () => {
  const result = await contract.methods.setWhitelistActive(true)
    .send({ from: accounts[0], gas: 0, value: 0 })
    .on('transactionHash', function (hash) {
      document.getElementById("web3_message").textContent = "Minting...";
    })
    .on('receipt', function (receipt) {
      document.getElementById("web3_message").textContent = "Success! Minting finished.";
    })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
}


function approveMiner() {
  //let spendDoc = document.getElementById("approve-spend");
  let _amount = 1000;
  //alert(_amount)

  approve(_amount);
}

function approve(_amount) {
  let amt;
  if (_amount != 0) {
    amt = +spend + +_amount;
    alert(amt)
  }
  else {
    amt = 0
  }
  let _spend = web3.utils.toWei(amt.toString())
  tokenContract.methods.approve(minerAddress, _spend).send({ from: accounts[0] }).then(result => {
    if (result) {
      //alert("aprovado")
      
      refreshData();
    }

  }).catch((err) => {
    console.log(err)
  });
}

function roundNum(num) {
  if (num == 0) { return 0};
  if (num < 1) {
      return parseFloat(num).toFixed(4)
  }
  return parseFloat(parseFloat(num).toFixed(2));
}


const Misnft = async () => {
  const result = await contract.methods.tokensOfOwner(true)
    .send({ from: accounts[0], gas: 0, value: 0 })
    .on('transactionHash', function (hash) {
      document.getElementById("web3_message").textContent = "Minting...";
    })
    .on('receipt', function (receipt) {
      document.getElementById("web3_message").textContent = "Success! Minting finished.";
    })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
}


