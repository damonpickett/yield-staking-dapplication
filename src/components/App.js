import React from 'react';
import '../App.css';
import Web3 from 'web3';
import Form from './Form';
import Tether from

function App() {

  // connect wallet before component mounts
  // async UNSAFE_componentWillMount() {
  //   await this.loadWeb3()
  //   await this.loadBlockchainData()
  // }

  return (
    <div className="App">
        <h1 className='app-title'>Yield Staking Dapplication</h1>
      <Form />
    </div>
  );
}

export default App;
