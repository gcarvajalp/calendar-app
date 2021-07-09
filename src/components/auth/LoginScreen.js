import React from 'react';
import './login.css';
import {
  Link,
} from "react-router-dom";
import { useDispatch } from 'react-redux';

import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

const LoginScreen = () => {

  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: ''
  })

  const { email, password } = formValues;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(startLogin(email, password));
  }

  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit btn-block"
                value="Login"
              />
            </div>

            <Link
              to={`/auth/register`}
              className="link"
            >Create a new account</Link>

          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen;