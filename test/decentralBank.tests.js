const RWD = artifacts.require('RWD')
const Tether = artifacts.require('Tether')
const DecentralBank = artifacts.require('DecentralBank')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', (accounts) => {
    // describe is telling us in the console what contract we're testing for...
    // and then launching an anonymous function
    describe('Mock Tether Deployment', () => {
        // it is telling us what we're testing within the contract...
        // and launching an async anon function
        it('matches name successfully', async () => {
            // assigning Tether contract and all properties to 'tether'
            let tether = await Tether.new()
            // assigning name of contract to 'name'
            const name = await tether.name()
            // assert library from chai: 'equal' compares two data types...
            // to see if they are equal
            assert.equal(name, 'Mock Tether Token')
        })
    })
    describe('RWD Deployment', () => {
        it('matches name successfully', async () => {
            let rwd = await RWD.new()
            const name = await rwd.name()
            assert.equal(name, 'Reward Token')
        })
    })
})