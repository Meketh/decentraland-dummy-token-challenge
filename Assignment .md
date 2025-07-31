# Full Stack Take home Assignment - V2

---

## Token Manager

### Abstract

A company has created an [ERC-20 token](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) on the Ethereum blockchain to manage the finances on its platform. They want to be able to manage the token transfers. In order to do so, they have drafted a simple web application ([dApp](https://ethereum.org/en/dapps/#what-are-dapps))

## Use cases of the application

1. The user must be able to see their balance of the token
2. The user must be able to transfer the token to another Ethereum address

## Deploying the Token

An [ERC-20 token](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) is basically a currency. You can hold it or transfer it to someone else. Real examples are MANA, DAI and USDT. To be able to interact with the contract you'll need two things:

- An [Ethereum wallet](https://ethereum.org/en/wallets/) like [MetaMask](https://metamask.io/) which will hold the tokens and generate and address (an unique identifier) for you
- To deploy the token to the network

The token has been created on [this repo](https://github.com/decentraland/dummy-token). Once you have your own wallet, follow the instructions on the README to set up a development environment with the token running on a local blockchain to deploy it.

## DApp

Continue the work done on the attached file below, which uses the token you just deployed in the last step (via ENV variables), and add the necessary logic to allow users to:

- Check their token balance.
- Transfer tokens from her wallet.

We want to keep Decentraland’s look and feel, so we’ll use [Decentraland UI](https://github.com/decentraland/ui/) to build it.

The dApp should look something like this:

[](https://lh3.googleusercontent.com/qH33GA65KRMOIAWetYuWWKb4Wd7LD7gaaKcI3eQ-HSAB-bL74zXvIkipEi9I4EqrfFkpBlKPGPvSolie86YvoNz4v4-mi5Z42HkfEPvr7cIscyErPHuAbYDr5JjAO8APXuxnQEH6)

## Considerations

The boilerplate, given to you in the compressed file, is using [Ethers.js](https://github.com/ethers-io/ethers.js/), which provides an easy way to interact with the Ethereum blockchain.

As stated on the [token repo](https://github.com/decentraland/dummy-token), [Hardhat](https://hardhat.org/getting-started/) can be used to set up a local development environment and help to test the token.

Although it might not be necessary to complete this task, reading [Ethereum’s documentation](https://ethereum.org/en/developers/) can help understand how Smart Contracts work, also [OpenZeppelin’s documentation](https://docs.openzeppelin.com/contracts/4.x/) can help understand what is a token and how it works. You might want to deploy your token to a remote [testnet](https://ethereum.org/en/developers/docs/networks/#ethereum-testnets) (like Sepolia) instead of running on a local development blockchain. Following [this tutorial](https://hardhat.org/tutorial/) can help to do that. Also, [Etherscan](https://etherscan.io/) is a great site to see transactions on actual networks.

If you use any of the testnet networks, there are [faucets](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) with free Ether for testing.

It is important to provide instructions on the project's README on how to run the application. It can be against a local contract and/or on a test network

The expected code should be *production ready code*, that is, code developed using quality standards (such as consistent formatting, testing, etc).

## Nice to have

- Draw the transfer section as a new page (different URL) using a using [react-router](https://github.com/remix-run/react-router) and react-router-dom.
- Consider using reselect for your selectors if necessary.

The exercise will be evaluated, first and foremost, on completing the two main **use cases**. *Nice to haves* will add to the result of your exercise once the hard requirements are done but are **not** necessary.

Please commit the code to GitHub and share the public repo link with us.

[dummy-token-ui-master.zip](dummy-token-ui-master.zip)