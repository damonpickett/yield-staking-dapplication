import React from 'react';
import '../App.css';
import Airdrop from './Airdrop';

function Form() {
  return (
    <div className="tablet">
        <div className='account-info'>
            <div className='form-section'>
                <h2>Account:</h2>
                <p className='address'>eb9dc0d2c22cfa5d212144fff2635821fba9f8b8db322f8009a7c83540816460</p>
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
