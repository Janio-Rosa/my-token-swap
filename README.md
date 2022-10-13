# my-token-swap
My TokenSwap like Uniswap website, just for learning purposes. It includes Solidity Smart Contracts, deployed on test net (Göerli), connected to the my custom react website to privde my custom token/eth swap functionality

# This stack uses truffle and web3 (nowadays hardhat has been more used, but I have another project with this one).
# To run our project:
# git clone git@github.com:Janio-Rosa/my-token-swap.git
# npm install
# truffle migrate --reset  (customize blockchain network on truffle-config.js if needed - or the contracts can be deployed independently, e.g. inject web3)
# update the two contract addresses on the react App (both token and ethswap addresses)
# finally we run react:  npm run start
# now it will be available, just use the site and do your swaps! (it will probablly be available on localhost:3000 )
