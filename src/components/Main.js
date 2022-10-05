import React, { Component } from 'react';
//import logo from '../logo.png';
import ethLogo from '../eth-logo.png';
//import tokenLogo from '../token-image.jpg';
import tokenLogo from '../token-logo.png';
import BuyForm from './BuyForm'
import SellForm from './SellForm'
class Main extends Component {

  constructor(props){
      super(props);
      this.state = {
          output: '0',
          currentForm: 'buy'
      }
  }
  

  render() {

    let content

    if(this.state.currentForm == 'buy'){
        content = <BuyForm ethBalance={this.props.ethBalance}
                       tokenBalance={this.props.tokenBalance}
                       buyTokens={this.props.buyTokens} />
 
    }else{
        content = <SellForm ethBalance={this.props.ethBalance}
                       tokenBalance={this.props.tokenBalance}
                       sellTokens={this.props.sellTokens} />
 
    }


    return (
      <div id="content" className="mt-3">


       <div className="d-flex justify-content-between mb-3">
           <button 
                onClick = {(event) => {
		    this.setState({currentForm: 'buy' })
		}}
		className="btn btn-light">Buy
	   </button>
           <span className="text-muted">&lt;&nbsp;&gt;</span>
           <button 
                onClick = {(event) => {
		    this.setState({currentForm: 'sell' })
		}}
		className="btn btn-light">Sell
	   </button>
       </div>

       <div className="card mb-4" >

          <div className="card-body">
              {content}
        </div>
      
      </div>       


      </div>
    );
  }
}

export default Main;
