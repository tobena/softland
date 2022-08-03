import React from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";

export default function ForgotPassword() {
    const form = React.useRef();
    const checkBtn = React.useRef();
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [successful, setSuccessful] = React.useState(false);

    const required = (value) => {
        if (!value) {
          return (
            <div className="alert alert-danger" role="alert">
              This field is required!
            </div>
          );
        }
      };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
      };

      const validEmail = (value) => {
        if (!isEmail(value)) {
          return (
            <div className="alert alert-danger" role="alert">
              This is not a valid email.
            </div>
          );
        }
      };

      const handleRegister = (e) => {
        e.preventDefault();
    
        setMessage("");
        setSuccessful(false);
    
    
        if (checkBtn.current.context._errors.length === 0) {
          AuthService.forgotPassword(email).then(
            (response) => {
              setMessage(response.data.message);
              setSuccessful(true);
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
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </div>
                <div className="form-group">
                <button className="btn btn-primary btn-block">Reset Password</button>
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
