import React, { Component } from 'react';
//import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar';
import Main from './Main';

import EthSwap from '../abis/EthSwap.json';
import Token from '../abis/JanioToken.json';
class App extends Component {


  async componentWillMount() {
      await this.loadWeb3();
//      console.log(window.web3);
//      const result = await this.loadBlockchainData();
//      if(result)
          this.setState({loading: false})
  }

  async loadBlockchainData() {
      const accounts = await window.web3.eth.getAccounts()
      console.log(accounts);
      console.log(accounts[0]);
      this.setState({ account: accounts[0] })
      console.log(this.state.account);
      const ethBalance = await window.web3.eth.getBalance(this.state.account)
      this.setState( { ethBalance: ethBalance })
      console.log(this.state.ethBalance)
      console.log("Ethereum balance of the account logged in ")
      const r1 = await this.loadEthContracts();
      const r2 = await this.loadTokenContracts();
      return (r1 && r2);

  }

  async loadEthContracts() {
      const abiEthSwap = EthSwap.abi
      const networkId = await window.web3.eth.net.getId()
      console.log("Network ID: ", networkId);
      if(networkId===13){

      }
      //const addressEthSwap = EthSwap.networks[networkId].address
      //const networkData = EthSwap.networks[networkId];

      //const addressEthSwap = EthSwap.networks['1665018638366'].address
      //EthSwap address on Goerli network
      //const addressEthSwap = "0xaA537eE86a4AA92C0f7B4b81755696eE9c59dcaB";  //Goerli
      const addressEthSwap = "0x5050a99908D274d877576c774FF8C605D2488F3F";

      const myEthSwap = new window.web3.eth.Contract(abiEthSwap, addressEthSwap );
      this.setState({myEthSwap: myEthSwap})
      console.log(myEthSwap);
  }

  async loadTokenContracts() {
      const abiToken = Token.abi
      const networkId = await window.web3.eth.net.getId()
      console.log("Network ID: ", networkId);
      //const addressToken = Token.networks['1665018638366'].address
      //Token address on Goerli network
      //const addressToken = "0xe6cb17D91be2426FBbf872a483234f177Ab8855F";  //Goerli
      const addressToken = "0xBAa8388B0449C0D8a3ddd130FEcb897910247B47"; 

      const myToken = new window.web3.eth.Contract(abiToken, addressToken );
      this.setState({myToken: myToken})
      console.log(myToken);
      let tokenBalance = await myToken.methods.balanceOf(this.state.account).call();
      if(tokenBalance == null){
          alert('Contracts not deployed on this network');
          this.setState({loading: true})
	  return false;
      }
      console.log("Token Balance: ");
      console.log(tokenBalance.toString());
      this.setState({tokenBalance: tokenBalance}) 
  }

  buyTokens = (etherAmount) => {
      this.setState({loading: true})
      this.state.myEthSwap.methods.buyTokens().send({from: this.state.account, value: etherAmount }).on('transactionHash', (hash) => {
        this.setState({loading:false})
      } )

      setTimeout( () => { this.setState({loading: false}); }, 9000);
  }
  
  sellTokens = (tokenAmount) => {
      this.setState({loading: true})
      this.state.myToken.methods.approve(this.state.myEthSwap.address, tokenAmount).send({ from: this.state.account });
      this.state.myEthSwap.methods.sellTokens(tokenAmount).send({from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({loading:false})
      } )
      setTimeout( () => { this.setState({loading: false}); }, 9000);

  }


  constructor(props){
      super(props);
      //this.state = { items: [], text: ''}
      this.state = {

          account: '',
          ethBalance: '0',
          myEthSwap: '',
          myToken: '',
          tokenBalance: '0',
          loading: true
      }

  }

  async loadWeb3() {
      if(window.ethereum){
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
      }else if(window.web3){
          window.web3 = new Web3(window.web3.currentProvider)
      }else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
  }

  render() {
    let content
    if(this.state.loading){
        content = <p id="loader" className="text-center">Loading...</p>
    }else{
        content = <Main 
		      ethBalance={this.state.ethBalance} 
			tokenBalance={this.state.tokenBalance.toString()}
                        buyTokens={this.buyTokens}
                        sellTokens={this.sellTokens}
			/>
    }
    return (
      <div>
        <Navbar account={this.state.account}/>
	<div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 mr-auto ml-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">

		{content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
