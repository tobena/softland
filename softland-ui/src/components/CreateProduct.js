import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
//import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import Select from "react-select";


const CreateProduct =(props)=> {

    const options = [
        { value: '0', label: '' },
        { value: '1', label: 'Binance Chain' },
        { value: '2', label: 'Etherium' }
     
    ];

    const form = useRef();
  
    const [name, setName] = useState("");
    const [fullname, setFullName] = useState("");

    const [chaintypeid, setChainTypeId] = useState("");
    const [chainType, setChainType] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
  
    const onChangeName = (e) => {
      //const username = e.target.value;
      setName(e.target.value);
    };
    const onChangeFullname = (e) => {
        //const username = e.target.value;
        setFullName(e.target.value);
      };


    const handleRegister = (e) => {
      e.preventDefault();
  
      setMessage("");
      setSuccessful(false);
  
  
    //   if (checkBtn.current.context._errors.length === 0) {
    //     AuthService.register(name, email).then(
    //       (response) => {
    //         setMessage(response.data.message);
    //         setSuccessful(true);
    //       },
    //       (error) => {
    //         const resMessage =
    //           (error.response &&
    //             error.response.data &&
    //             error.response.data.message) ||
    //           error.message ||
    //           error.toString();
  
    //         setMessage(resMessage);
    //         setSuccessful(false);
    //       }
    //     );
    //   }
    };
  

      
    return (
        <div className="col-md-12">
        <div className="card card-container">
  <h4>Create new Product</h4>
         <Form >
            {!successful && (
              <div>
                  <div className="form-group">
                  <label htmlFor="username">Chain Type:</label>
                  <Select
                                options={options}
                                onChange={(event) => {
                                    setChainTypeId(event.value);
                                    setChainType(event.label)
                                }}
                            />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Product / Crypto Name:</label>
                  <Input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={onChangeName}
                
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Product / Crypto Fullname:</label>
                  <Input
                    type="text"
                    className="form-control"
                    value={fullname}
                    onChange={onChangeFullname}
                
                  />
                </div>
                <div className="card card-container">
                <div className="form-group">
                 
                  <label >Chain Type: {chainType}</label>
                  <label >Name: {name}</label>
                  <label >Fullname : {fullname}</label>
               
                </div>
                </div>
  
  

  
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Next</button>
                </div>
              </div>
            )}

          </Form>
        </div>
      </div>



    );
};
export default CreateProduct
