import React from 'react';
import { useDispatch } from 'react-redux';

import './login.css';
import {
  Link
} from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

const RegisterScreen = () => {

  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formValues;

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      return Swal.fire('Error', 'contraseñas no coinciden', 'warning');
    }

    dispatch(startRegister(name, email, password));
  }

  return (
    <div className="container login-container">
      <div className="row justify-content-center">

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="name"
                value={name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
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
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="password2"
                value={password2}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit btn-block"
                value="Crear cuenta" />
            </div>

            <Link
              to={`auth/register`}
              className="link"
            >
              Already registered?
            </Link>

          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen;