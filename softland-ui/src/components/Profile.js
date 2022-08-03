import React from "react";
import AuthService from "../services/auth.service";
import Popup from "../components/builder/Popup";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [buttonPopup, setButtonPopup] = React.useState(false);
  const [wallet, setWallet] = React.useState("");
  const form = React.useRef();


  const onChangeWallet = (e) => {
    const wallet = e.target.value;
    setWallet(wallet);
  };

  const handleSaveAddress = () => {
    const userid = currentUser.id;
    AuthService.updateUser(userid, wallet,currentUser).then(
      (response) => {

        setButtonPopup(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

      }
    );


  };

  return (

    <div className="container">

      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p>
        <strong>Crypto Wallet:</strong> {currentUser.walletAddress} 
        <button onClick={() => setButtonPopup(true)}>Edit</button>
      </p>

      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <p>Edit Wallet Address </p>
        <button onClick={() => handleSaveAddress()}>connect Metamask</button>
        <Form  ref={form}>

          <div className="form-group">
            <label htmlFor="address">wallet Address</label>
           
            <Input
              type="text"
              className="form-control"
              name="address"
              value={wallet}
              onChange={onChangeWallet}
              required
            />
          </div>
          <button onClick={() => handleSaveAddress()}>Save</button>
        </Form>
      </Popup>
    </div>
  );
};

export default Profile;
