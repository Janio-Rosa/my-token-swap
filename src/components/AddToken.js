
import React, { Component } from 'react';
//import logo from '../logo.png';
import ethLogo from '../eth-logo.png';
//import tokenLogo from '../token-image.jpg';
import tokenLogo from '../token-logo.png';

class AddToken extends Component {

  constructor(props){
      super(props);
      this.state = {
          output: '0'
      }
  }

  function addMyJnioToken() {

      const tokenAddress = this.props.tokenAddress';
      const tokenSymbol = this.props.tokenSymbol;
      const tokenDecimals = 18;
      const tokenImage = ''; // no image for now

      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
              address: tokenAddress, // The address that the token is at.
              symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: tokenDecimals, // The number of decimals in the token
              image: tokenImage, // A string url of the token logo
            },
          },
        });
  
        if (wasAdded) {
          console.log('Thanks for your interest!'); return true;
        } else {
          console.log('That is ok! When the token is value enough you will sure come back :) !'); return false;
        }
      } catch (error) {
        console.log(error); return false;
      }
  }


  render() {
      return (
           <div> 
               <button type="button" className="btn btn-primary btn-block btn-lg">Add My Token!</button>
           </div>
      );
  }


}

export default AddToken;
