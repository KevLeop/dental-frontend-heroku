import { URL_BACKEND } from "../environments/environments";

export const postLogin = async (objAuth) => {
  const peticion = await fetch(`${URL_BACKEND}/login-custom`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(objAuth),
  });
  let data = await peticion.json();
  return data;
};

export const postRegister = async (objUsuario) => {
  const peticion = await fetch(`${URL_BACKEND}/registro`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(objUsuario),
  });
  let data = await peticion.json();
  return data;
};
