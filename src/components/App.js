import React, {useState, useEffect} from 'react';
import '../App.css';
import Web3 from 'web3';
import Form from './Form';

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState('0x0')

  // connect wallet before component mounts
  useEffect(() => {
    async function loadWeb3() {
      if(window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.request({ method: 'eth_requestAccounts'})
      } else if(window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      } else {
        window.alert('No wallet detected.')
      }
      console.log(window.web3)
    }
    loadWeb3();
  }, [])

  return (
    <div className="App">
        <h1 className='app-title'>Yield Staking Dapplication</h1>
      <Form />
    </div>
  );
}

export default App;
