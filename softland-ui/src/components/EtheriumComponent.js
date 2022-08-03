import React from 'react'
import { useStoreApi } from '../crypto_service/storeApi';
import { useWeb3 } from '../crypto_service/getWeb3';
// import './App.css';
import { Button, TextField } from '@material-ui/core';
import Popup from 'reactjs-popup';





const EtheriumComponent =() =>{

    const { address, balance, message, setBalance, setAddress } = useStoreApi();
    const web3 = useWeb3();
  
    const setUserAccount = async () => {
      if (window.ethereum) {
        await window.ethereum.enable();
  
        window.ethereum.on('accountsChanged', function (accounts) {
          setAddress(accounts[0]);
          setUserBalance(accounts[0]);

        })
  
        web3.eth.getAccounts().then(accounts => {
          setAddress(accounts[0]);
          setUserBalance(accounts[0]);
        });
      }
    };
  
    const setUserBalance = async (fromAddress) => {
      await web3.eth.getBalance(fromAddress).then(value => {
        const credit = web3.utils.fromWei(value, 'ether')
        setBalance(credit);
      });
    };
  
    const sendTransaction = async e => {
      e.preventDefault();
      const amount = e.target[0].value;
      const recipient = e.target[1].value;
      await web3.eth.sendTransaction({
        from: address,
        to: recipient,
        value: web3.utils.toWei(amount, 'ether')
      });
      setUserBalance(address);
    }
  
  
    return (
        // <div className="col-md-12">
        // <div className="card card-container">
        <div class="center">
          {/* <img src={ethlogo} className="App-logo" alt="ethlogo" /> */}
          <p>
            <code>Welcome to a decentralized application</code>
          </p>
          {
            address ? (
              <>
                <p>Your Address: {address}</p>
                <p>Balance: {balance} ETH</p>
              </>
            ) : <Button variant="outlined"
              color="primary"
              onClick={() => setUserAccount()}
            >
              Connect to Metamask
        </Button>}
          {/* <Button variant="outlined"
            color="primary"
            onClick={() => setUserAccount()}
          >
            Connect to Metamask
        </Button> */}
          <br></br>
          <form onSubmit={(e) => sendTransaction(e)}>
            <TextField
              style={{ margin: 8 }}
              inputProps={{ step: "any" }}
              label="Amount to send"
              id="filled-margin-none"
              required
              placeholder="100"
              variant="filled"
              type='number'
            />
            <TextField
  
              style={{ margin: 8 }}
              label="Recipient Address"
              id="filled-margin-none"
              required
              placeholder="24cnsinafjnoiaixxuyyio"
              variant="filled"
              fullWidth
            />
  
            <Button
              style={{ margin: "15px" }}
              variant="outlined"
              color="default"
              type="submit"
            >
              Send Transaction
        </Button>
  
          </form>
          <Popup trigger={<button> Trigger</button>} position="right center">
            <div>
  
              <Button variant="outlined" color="primary">
                BUY From pay pall
  </Button>
              <Button variant="outlined" color="primary">
                BUY From pay pall
  </Button>
  
  
  
            </div>
          </Popup>
          </div>
    //   </div>
    );
}

export default EtheriumComponent
