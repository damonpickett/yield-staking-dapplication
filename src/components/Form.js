import React from 'react';
import '../App.css';
import Airdrop from './Airdrop';

function Form(props) {
  return (
    <div className="tablet">
        <div className='account-info'>
            <div className='form-section'>
                <h2>Account:</h2>
                <p className='address'>{props.account}</p>
            </div>
            <div className='form-section'>
                <h2>Account Balance:</h2>
                <h2 className='balance'>{props.accountBalance} mUSDT</h2>
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
            <input className='stake-input'></input>
            <button>Deposit</button>
            <button>Withdraw</button>
        </div>
        <Airdrop />
    </div>
  );
}

export default Form;
