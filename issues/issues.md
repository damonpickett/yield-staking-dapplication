# My Issue
I'm building a yield staking dapplication with React and Solidity. I built this by following a tutuorial. The dapp connects to the user's wallet and allows the user to stake their tokens for a reward. The issue I'm having is calling on my DecentralBank contract to issue the reward tokens (the tutorial intentionally left this part out for students to figure out on their own). In the tutorial a 'script' folder was created with a js file inside for issuing the reward tokens. I believe I'm supposed to run this script once my airdrop timer hits '0'. I have not been able to figure out how to call this script.

# What I've Tried
Initially, the script was placed at the main level of my app. When I tried to import the script into my Airdrop component, my localhost showed an error message saying "Relative imports outside of src/ are not supported" I moved the script folder into my src folder and tried to import the script via the following syntax: ```import '../scripts/issue-tokens'```. This produced an error message saying " 'artifacts' is not defined ". Subsequent research suggested that 'artifacts' should only be used in the 'test' folder. I have also tried calling the function in my DecentralBank contract directly from my Airdrop component, but this has produced an error message which says "the caller is not the owner" I believe this is why the script is supposed to be used.


# The Code

## The Script

```js
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function issueRewards(callback) {
    let decentralBank = await DecentralBank.deployed()
    await decentralBank.issueTokens()
    console.log('Tokens have been issued successfully!')
    callback()
}
```

## Airdrop Component Function

```js
airdropReleaseTokens() {
      let stakingB = this.props.stakingAccountBalance
      if(stakingB >= '50000000000000000000') {
        this.startTimer()
      }
      // code for issuing tokens must come here
      // when timer gets to zero, issueTokens from DecentralBank.sol
      if(this.state.time.m === 0 && this.state.time.s === 0) {
          issueTokens()
      }
  }
```

## DecentralBank Contract Function

```
function issueTokens() public {
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient] / 9;
            if(balance > 0) {
            rwd.transfer(recipient, balance);
            }
        }
    }
```

Here is the link to my GitHub repo: [https://github.com/damonpickett/yield-staking-dapplication](https://github.com/damonpickett/yield-staking-dapplication)

Thank you, any help would be much appreciated.
