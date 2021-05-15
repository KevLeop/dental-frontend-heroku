import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import PacientesContext from "../../../../../contexts/pacientesContext";
import { putPacientes } from "../../../../../services/pacientesService";
import moment from "moment";
const PacienteFormEditar = () => {
  const {
    pacienteEditar,
    setModalEditarPaciente,
    obtenerPacientes,
  } = useContext(PacientesContext);

  const [formEditar, setFormEditar] = useState({
    ...pacienteEditar,
  });

  const handleChange = (e) => {
    setFormEditar({
      ...formEditar,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Seguro de editar paciente",
      icon: "question",
      text: "Los cambios se guardarán en la base de datos",
      showCancelButton: "true",
    }).then((rpta) => {
      if (rpta.isConfirmed) {
        delete formEditar["pacienteImagen"];
        putPacientes({ ...formEditar }).then((data) => {
          console.log(data);
          if (data.success) {
            setModalEditarPaciente(false);
            obtenerPacientes();
            Swal.fire({
              title: "Editado",
              icon: "success",
              showCancelButton: false,
              showConfirmButton: false,
              timer: 800,
            });
          }
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          className="form-control"
          type="text"
          placeholder="Nombres del paciente"
          name="pacienteNombre"
          value={formEditar.pacienteNombre}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="apellido">Apellido:</label>
        <input
          id="apellido"
          className="form-control"
          type="text"
          placeholder="Apellidos del paciente"
          name="pacienteApellido"
          value={formEditar.pacienteApellido}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <div className="form-control input-group">
          <label htmlFor="fechadenacimiento">Fecha de Nacimiento:</label>
          <input
            className="custom-date"
            type="date"
            id="fechadenacimiento"
            name="pacienteFnacimiento"
            value={moment(formEditar.pacienteFnacimiento).format("YYYY-MM-DD")}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="telefono">Telefono:</label>
        <input
          id="telefono"
          className="form-control"
          type="text"
          placeholder="Teléfono"
          name="pacienteTelefono"
          value={formEditar.pacienteTelefono}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <select
          className="form-control"
          name="pacienteSexo"
          id="sexo"
          onChange={handleChange}
        >
          <option value="">--Seleccione genero del paciente...</option>
          <option value="F">Femenino</option>
          <option value="M">Masculino</option>
          <option value="O">No especificar</option>
        </select>
      </div>
      <div className="form-group d-flex justify-content-between">
        <button className="btn btn-primary" type="submit">
          Guardar cambios
        </button>
      </div>
    </form>
  );
};

export default PacienteFormEditar;
