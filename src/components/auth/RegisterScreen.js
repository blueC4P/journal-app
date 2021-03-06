import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

export const RegisterScreen = () => {

  const dispatch = useDispatch();

  const {msgError} = useSelector(state => state.ui)

  const [values, handleInputChange] = useForm({
    name: 'osama',
    email: 'osama@react.com',
    password: '123456',
    password2: '123456'
  });

  const {name,email,password,password2} = values;

  const handleRegister = (e) => {
    e.preventDefault();
    
    if(isFormValid()){
      dispatch(startRegisterWithEmailPasswordName(email,password,name))
    }

  }

  const isFormValid = () => {
    
    if(name.trim().length === 0){
      dispatch(setError('name is required'))
      return false
    } else if (!validator.isEmail(email)) {
      dispatch(setError('email is not valid'))
      return false
    }else if(password !== password2 || password.length < 5){
      dispatch(setError('password should be at leat 6 characters and match each orther'))
      return false
    }
    dispatch(removeError())
    return true;
  }

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleRegister}>
    
        {
          (msgError) &&
          (<div className="auth__alert-error">{msgError}</div>)
          
        }
    
        <input
          type="text"
          placeholder="name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link className="link" to="/auth/login">
          Already registered ?
        </Link>
      </form>
    </>
  );
};
