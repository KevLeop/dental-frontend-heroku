import { URL_BACKEND } from "../environments/environments";

export const getTratamientos = async () => {
  const peticion = await fetch(`${URL_BACKEND}/tratamientos`);
  const data = await peticion.json();
  return data;
};

export const postTratamientos = async (objTratamiento) => {
  const peticion = await fetch(`${URL_BACKEND}/tratamientos`, {
    method: "POST",
    body: JSON.stringify(objTratamiento),
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await peticion.json();
  return data;
};

export const putTratamientos = async (objTratamiento) => {
  const peticion = await fetch(
    `${URL_BACKEND}/tratamientos/${objTratamiento.paciente}`,
    {
      method: "PUT",
      body: JSON.stringify(objTratamiento),
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  const data = await peticion.json();
  return data;
};

export const deleteTratamiento = async (trat_id) => {
  const peticion = await fetch(`${URL_BACKEND}/tratamientos/${trat_id}`, {
    method: "DELETE",
  });
  const data = await peticion.json();
  return data;
};
