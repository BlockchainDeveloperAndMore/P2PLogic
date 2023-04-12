import Wallet from 'ethereumjs-wallet'
import { ethers } from 'ethers';

/*
 * Part of wallet generation.
 */
  
type KeyPairType =  {
    PrivateKey: string,
    Address: string,
};

// Generating key pair from random hash.
function generateKeyPairBNB(): KeyPairType {
    let addressData = Wallet.generate();
        var KeyPair = {
            PrivateKey: addressData.getPrivateKeyString(),
            Address: addressData.getAddressString(),
        };
    return KeyPair; 
}

/*
 * Configuring the connection to an BinanceChain node.
 */

var BinanceChainNodeUrl = 'https://data-seed-prebsc-1-s3.binance.org:8545'; // https://www.quicknode.com/
var customHttpProvider = new ethers.providers.JsonRpcProvider(BinanceChainNodeUrl);

/*
 * Part of BNB transaction creation.
 */

// Main BNB transaction function.
async function transferBNB(SenderPrivateKey: string, RecipientAddress: string, AmountBNB: number){
    
    // Creating a signing account from a private key.
    let PrivateKey = SenderPrivateKey.slice(2); 
    const signer = new ethers.Wallet(PrivateKey, customHttpProvider);
    
    // Creating and sending the transaction object.
    const tx = await signer.sendTransaction({
        to: RecipientAddress,
        value: ethers.utils.parseUnits(AmountBNB.toString(), "ether"),
      });
    console.log("Mining transaction...");
    console.log(`https://testnet.bscscan.com/tx/${tx.hash}`); // change to 'https://bscscan.com/tx/${tx.hash}' then mainnet setup
   
    // Waiting for the transaction to be mined.
    const receipt = await tx.wait();
    
    // The transaction is now on chain.
    console.log(`Mined in block ${receipt.blockNumber}`);

}

/*
 * ABI contract BEP-20 tokens.  
 */

const ABI_BEP20 = `[
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]`

/*
 * Part of BEP-20 tokens.
 */

// BEP-20 tokens transfer function.
async function transferBEP20(TokenContractAddress: string, SenderPrivateKey: string, RecipientAddress: string, AmountTokens: number){
    
    // Creating a signing account from a private key.
    let PrivateKey = SenderPrivateKey.slice(2); 
    const signer = new ethers.Wallet(PrivateKey, customHttpProvider);
    
    // Creating contract info.
    const contract = new ethers.Contract(TokenContractAddress, ABI_BEP20, signer);
    const ValueTokens = ethers.utils.parseUnits(AmountTokens.toString(), 18);
    
    // Call transfer function in token contract.
    await contract.transfer(RecipientAddress, ValueTokens); 
    
    console.log(`Successful transfer ${AmountTokens} USDT to address ${RecipientAddress}`);
}

// BEP-20 tokens approve function.
async function approveBEP20(TokenContractAddress: string, SenderPrivateKey: string, RecipientAddress: string, AmountTokens: number){
    
    // Creating a signing account from a private key.
    let PrivateKey = SenderPrivateKey.slice(2); 
    const signer = new ethers.Wallet(PrivateKey, customHttpProvider);
	const SenderAddress = new ethers.Wallet(SenderPrivateKey).address;
    
    // Creating contract info.
    const contract = new ethers.Contract(TokenContractAddress, ABI_BEP20, signer);
    const ValueTokens = ethers.utils.parseUnits(AmountTokens.toString(), 18);
    
    // Call approve function in token contract.
    await contract.approve(RecipientAddress, ValueTokens); 
    
    console.log(`Successful approve from ${SenderAddress} ${AmountTokens} USDT to address ${RecipientAddress}`);
}

// BEP-20 tokens transferFrom function.
async function transferFromBEP20(TokenContractAddress: string, MainPrivateKey: string, SenderAddress: string, RecipientAddress: string, AmountTokens: number){
    
    // Creating a signing account from a private key.
    let PrivateKey = MainPrivateKey.slice(2); 
    const signer = new ethers.Wallet(PrivateKey, customHttpProvider);
    
    // Creating contract info.
    const contract = new ethers.Contract(TokenContractAddress, ABI_BEP20, signer);
    const ValueTokens = ethers.utils.parseUnits(AmountTokens.toString(), 18);
    
    // Call transferFrom function in token contract.
    await contract.transferFrom(SenderAddress, RecipientAddress, ValueTokens); 
    
    console.log(`Successful transfer from ${SenderAddress} to address ${RecipientAddress} - ${AmountTokens} USDT`);
}

// BEP-20 tokens balanceOf call function.
async function balanceOfBEP20(TokenContractAddress: string, SenderPrivateKey: string){
    
    // Creating a signing account from a private key.
    let PrivateKey = SenderPrivateKey.slice(2); 
    const signer = new ethers.Wallet(PrivateKey, customHttpProvider);
    
    // Creating contract info.
    const contract = new ethers.Contract(TokenContractAddress, ABI_BEP20, signer);
    const SenderAddress = new ethers.Wallet(SenderPrivateKey).address;

    // Call balanceOf function in token contract. 
    const balanceOfTokens = await contract.balanceOf(SenderAddress);
    console.log(`Address ${SenderAddress} balance equal ${ethers.utils.formatUnits(balanceOfTokens, 18)} USDT`);
}

/*
 * Part of MultiTool function.
 */

// Function to approve max value on user address for main address and transfer first withdrawal. 
async function firstWithdrawalForUserAddressBNB(TokenContractAddress: string, MainPrivateKey: string, SenderPrivateKey: string, RecipientAddress: string, AmountTokens: number){
    
    // Set max uint for maximum approve value. 
    const MAX_VALUE = Number.MAX_SAFE_INTEGER - 1;
    const gasValue = 0.001; // Gas Used by call = 45k * gasPrice 5 gwei ~= 0.00025 BNB. (0.00050 BNB to testNet)

    // Transfer 0.00025 BNB to user address for gas to approve. 
    const SenderAddress = new ethers.Wallet(SenderPrivateKey).address;
    console.log(`SenderAddress = ${SenderAddress}`);
    await transferBNB(MainPrivateKey, SenderAddress, gasValue);
    
    // Approve to maximum value user address for main address.
    const MainAddress = new ethers.Wallet(MainPrivateKey).address;
    console.log(`MainAddress = ${MainAddress}`);
    await approveBEP20(TokenContractAddress, SenderPrivateKey, MainAddress, MAX_VALUE);

    // Transfer from user addres to recipient address with main address.
    await transferFromBEP20(TokenContractAddress, MainPrivateKey, SenderAddress, RecipientAddress, AmountTokens);
}