import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";

import {useLocation} from "react-router-dom";


const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  

  
  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };
export default function NewPassword(props) {

    const form = useRef();
    const checkBtn = useRef();
    const search = useLocation().search;
    const resetid = new URLSearchParams(search).get('resetid');
    const resetcode = new URLSearchParams(search).get('resetcode');

  
    const [cpassword, setCpassword] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
  
    const onChangeCpassword = (e) => {
      const cpassword = e.target.value;
      setCpassword(cpassword);
    };
  
    const sameCheck = () => {
      if (password!== cpassword) {
        return (
          <div className="alert alert-danger" role="alert">
            The password must must match.
          </div>
        );
      }
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };
  
    const handleRegister = (e) => {
      e.preventDefault();
  
      setMessage("");
      setSuccessful(false);
  
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        AuthService.updatePassword(resetid,resetcode,password).then(
          () => {
           // setMessage(response.data.message);
            setSuccessful(true);
            AuthService.logout();
            props.history.push("/login");
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      }
    };

    return (
        <div className="col-md-12">
      <div className="card card-container">
    

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
    

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={cpassword}
                  onChange={onChangeCpassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword,sameCheck]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Reset</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
    )
}
