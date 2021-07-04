import React from 'react';
import './login.css';
import {
  Link
} from "react-router-dom";

const LoginScreen = () => {
  return (
    <div className="container login-container">
      <div className="row justify-content-center">

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
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

export default LoginScreen;