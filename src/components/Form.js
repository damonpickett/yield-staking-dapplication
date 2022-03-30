import React, { useState }from 'react';
import '../App.css';
import Airdrop from './Airdrop';
import Web3 from 'web3';

function Form(props) {
    const [amount, setAmount] = useState('')

    function handleChange(event) {
        const input = event.target.value;
        const amount = window.web3.utils.toWei(input, 'Ether')
        setAmount(amount)
    }

  return (
    <div className="tablet">
        <div className='account-info'>
            <div className='form-section'>
                <h2>Account:</h2>
                <p className='address'>{props.account}</p>
            </div>
            <div className='form-section'>
                <h2>Account Balance:</h2>
                <h2 className='balance'>{window.web3.utils.fromWei(props.tetherAccountBalance)} mUSDT</h2>
            </div>
            <div className='form-section'>
                <h2>Staking Balance:</h2>
                <h2 className='balance'>0 mUSDT</h2>
            </div>
            <div className='form-section'>
                <h2>Reward Balance:</h2>
                <h2 className='balance'>0 mUSDT</h2>
            </div>
        </div>
        <div className='account-action'>
            <h2>Stake Tokens:</h2>
            <input className='stake-input' onChange={handleChange}></input>
            <button onClick={props.stakeTokens(amount)}>Deposit</button>
            <button>Withdraw</button>
        </div>
        <Airdrop />
    </div>
  );
}

export default Form;
