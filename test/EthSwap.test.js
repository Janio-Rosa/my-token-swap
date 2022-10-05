
const Token = artifacts.require('JanioToken');
const EthSwap = artifacts.require('EthSwap');

require('chai').use(require('chai-as-promised')).should()

function convertTokens(n){
	return web3.utils.toWei(n,'ether');
}

contract ('EthSwap', ([deployer, investor]) => {

	let ethSwap 
	let token 
	let totalSupply = convertTokens('1000000')
	
	before( async () => {

 		token = await Token.new()
		ethSwap = await EthSwap.new(token.address)
		await token.transfer(ethSwap.address, totalSupply);
	})


	describe('Token dployment', async () => {
		it('contract has a name', async () => {
			const name = await token.name()
			assert.equal(name, 'Janio Token')
		})

	})



	describe('EthSwap dployment', async () => {
		it('contract has a name', async () => {
			const name = await ethSwap.name()
			assert.equal(name, 'EthSwap Janio Exchange')
		})

		it('contract has tokens', async () => {
			let balance = await token.balanceOf(ethSwap.address)
			assert.equal( balance.toString(), totalSupply );
		})

	})

	describe('buyTokens()', async () => {
	    let result
	    before( async() => {
	        result = await ethSwap.buyTokens({from: investor, value: web3.utils.toWei('1', 'ether')})

	    })
	    it('Allows user to instantly purchase tokens from ethSwap for a fixed price', async () => {
//	        await ethSwap.buyTokens({from: accounts[1], value: '1000000000000000000'})
		let investorBalance = await token.balanceOf(investor);
		assert.equal( investorBalance.toString(), convertTokens('100'))

		let ethSwapBalance
		ethSwapBalance = await token.balanceOf(ethSwap.address)
		assert.equal(ethSwapBalance.toString(), convertTokens('999900'))

		//check ehter balance
		ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
		assert.equal(ethSwapBalance.toString(), web3.utils.toWei('1', 'Ether'))

		//console.log(result.logs[0].args)
		const event = result.logs[0].args
		assert.equal(event.from, ethSwap.address)
		assert.equal(event.to,investor)
		assert.equal(event.tokenAddress,token.address)
		assert.equal(event.amount.toString(), convertTokens('100').toString())
		assert.equal(event.rate.toString(), '100')

		await ethSwap.sellTokens( convertTokens('500'), {from: investor}).should.be.rejected;
	    })
	})


	describe('sellTokens()', async () => {
	    let result
	    before( async() => {
		await token.approve(ethSwap.address, convertTokens('100'), {from: investor})
	        result = await ethSwap.sellTokens( convertTokens('100'), {from: investor})

	    })
	    it('Allows user to instantly sell tokens to ethSwap for a fixed price', async () => {
//	        await ethSwap.buyTokens({from: accounts[1], value: '1000000000000000000'})

		let investorBalance = await token.balanceOf(investor);
		assert.equal( investorBalance.toString(), convertTokens('0'))

		let ethSwapBalance
		ethSwapBalance = await token.balanceOf(ethSwap.address)
		assert.equal(ethSwapBalance.toString(), convertTokens('1000000'))

		//check ehter balance
		ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
		assert.equal(ethSwapBalance.toString(), web3.utils.toWei('0', 'Ether'))

		//console.log(result.logs[0].args)
		const event = result.logs[0].args
		assert.equal(event.from, investor)
		assert.equal(event.to,ethSwap.address)
		assert.equal(event.tokenAddress,token.address)
		assert.equal(event.amount.toString(), convertTokens('100').toString())
		assert.equal(event.rate.toString(), '100')


	    })
	})



})
