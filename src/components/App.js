import React, {useState, useEffect} from 'react';
import '../App.css';
import Web3 from 'web3';
import Form from './Form';
import Tether from '../truffle_abis/Tether.json';

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState('0x0')
  const [accountBalance, setAccountBalance] = useState('0')
  const [tether, setTether] = useState({})


  // connect wallet before component mounts
  useEffect(() => {

    async function uponLoad() {
      await loadWeb3();
      await loadBlockChainData();
    }
    uponLoad();

    async function loadWeb3() {
      if(window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.request({ method: 'eth_requestAccounts'})
      } else if(window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      } else {
        window.alert('No wallet detected.')
      }
    }

    async function loadBlockChainData() {
      // Get account from metamask
      const web3 = window.web3
      const account = await web3.eth.getAccounts()
      setAccount(account)
      const networkId = await web3.eth.net.getId()
      console.log(account)

      // Load tether tokens
      const tetherData = Tether.networks[networkId]
      if(tetherData) {
        const tetherABI = new web3.eth.Contract(Tether.abi, tetherData.address)
        setTether(tetherABI)
        let tetherBalance = await tetherABI.methods.balanceOf(account.toString()).call()
        console.log(account)
      }

      setLoading(false);
    }
  }, [])

  return (
    <div className="App">
      <h1 className='app-title'>Yield Staking Dapplication</h1>
      {loading ? <p className='loading'>Loading, please wait...</p> 
      : <Form 
      account={account} 
      accountBalance={accountBalance}/>
      }
      
    </div>
  );
}

export default App;
