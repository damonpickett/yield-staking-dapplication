const RWD = artifacts.require('RWD')
const Tether = artifacts.require('Tether')
const DecentralBank = artifacts.require('DecentralBank')

require('chai')
.use(require('chai-as-promised'))
.should()

// owner and customer are addresses obtained from Ganache
contract('DecentralBank', ([owner, customer]) => {
    let tether, rwd, decentralBank

    function tokens(number) {
        return web3.utils.toWei(number, 'ether')
    }

    before(async () => {
        // load contracts
        tether = await Tether.new()
        rwd = await RWD.new()
        decentralBank = await DecentralBank.new(rwd.address, tether.address)

        // Transfer all tokens to DecentralBank (1 million)
        await rwd.transfer(decentralBank.address, tokens('1000000'))

        // Transfer 100 mock Tethers to customer
        await tether.transfer(customer, tokens('100'), {from: owner})
    })

    // describe is telling us in the console what contract we're testing for...
    // and then launching an anonymous function
    describe('Mock Tether Deployment', () => {
        // it is telling us what we're testing within the contract...
        // and launching an async anon function
        it('matches name successfully', async () => {
            // assigning name of contract to 'name'
            const name = await tether.name()
            // assert library from chai: 'equal' compares two data types...
            // to see if they are equal
            assert.equal(name, 'Mock Tether Token')
        })
    })
    describe('RWD Deployment', () => {
        it('matches name successfully', async () => {
            const name = await rwd.name()
            assert.equal(name, 'Reward Token')
        })
    })
    describe('Decentral Bank Deployment', () => {
        it('matches name successfully', async () => {
            const name = await decentralBank.name()
            assert.equal(name, 'Decentral Bank')
        })
        it('contract has tokens', async () => {
            let balance = await rwd.balanceOf(decentralBank.address)
            assert.equal(balance, tokens('1000000'))
        })
    })
    describe('Yield Farming', () => {
        it('rewards tokens for staking', async () => {
            // check investor balance
            let result
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'customer mock wallet balance before staking')
            // check staking for customer of 100 customers
            await tether.approve(decentralBank.address, tokens('100'), {from: customer})
            await decentralBank.depositTokens(tokens('100'), {from: customer})
            //check updated balance of customer
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('0'), 'customer mock wallet balance after staking')
            // check updated balance of decentral bank
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('100'), 'decentral bank mock wallet balance after staking from customer')
            // is staking balance
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), 'true', 'customer is staking status after staking')
            
        })
    })
})