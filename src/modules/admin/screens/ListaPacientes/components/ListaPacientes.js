import React, { useContext, useEffect, useState } from "react";
import PacientesContext from "../../../../../contexts/pacientesContext";
import Swal from "sweetalert2";
import { MDBDataTable } from "mdbreact";
import { deletePaciente } from "../../../../../services/pacientesService";
import Moment from "moment";
import "moment/min/locales";
Moment.locale("es");

const ListaPacientes = () => {
  const {
    pacientes,
    cargandoPacientes,
    obtenerPacientes,
    setPacienteDetalle,
    objDetallePaciente,
    setObjDetallePaciente,
    setmodalCrearPaciente,
    setModalEditarPaciente,
    setPacienteEditar,
  } = useContext(PacientesContext);
  const [pacientesFilter, setPacientesFilter] = useState({});

  useEffect(() => {
    setPacientesFilter(
      pacientes
        .filter((objPaciente) => objPaciente.pacienteEstado === true)
        .map((pac) => {
          return {
            ...pac,
            // pacienteDni: pac.pacienteDni,
            pacienteFnacimiento: Moment(pac.pacienteFnacimiento).format(
              "YYYY-MM-DD"
            ),
            pacienteEstado: true,
            acciones: (
              <>
                <button
                  className="btn rounded-circle fa-lg px-0 py-0 ml-1"
                  onClick={(e) => {
                    setPacienteDetalle(true);
                    setObjDetallePaciente({
                      pacienteDni: pac.pacienteDni,
                      pacienteNombre: pac.pacienteNombre,
                      pacienteApellido: pac.pacienteApellido,
                      pacienteFnacimiento: Moment(
                        pac.pacienteFnacimiento
                      ).format("LL"),
                      pacienteTelefono: pac.pacienteTelefono,
                      pacienteSexo: pac.pacienteSexo,
                      pacienteImagen: pac.pacienteImagen,
                    });
                    // console.log(objDetallePaciente);
                  }}
                >
                  <i
                    className="fa fa-info-circle fa-sm" // boton info
                    aria-hidden="true"
                  ></i>
                </button>
                <button
                  className="btn px-0 py-0 ml-1"
                  onClick={() => {
                    setPacienteEditar(pac);
                    setModalEditarPaciente(true);
                  }}
                >
                  <i
                    className="fa fa-pencil-square fa-lg"
                    aria-hidden="true"
                  ></i>
                </button>
                <button
                  className="btn rounded-circle px-0 py-0 ml-1"
                  onClick={() => {
                    eliminar(pac.pacienteDni);
                  }}
                >
                  <i
                    className="fa fa-minus-circle fa-lg" // boton eliminar
                    aria-hidden="true"
                  ></i>
                </button>
              </>
            ),
          };
        })
    );
    // console.log(pacientesFilter);
  }, [pacientes]);

  const data = {
    columns: [
      {
        label: "DNI",
        field: "pacienteDni",
      },
      {
        label: "Nombre",
        field: "pacienteNombre",
      },
      {
        label: "Apellido",
        field: "pacienteApellido",
      },
      {
        label: "Fech. Nac.",
        field: "pacienteFnacimiento",
      },

      {
        label: "Sexo",
        field: "pacienteSexo",
      },
      {
        label: "Cel",
        field: "pacienteTelefono",
      },
      // {
      //   label: "Estado",
      //   field: "pacienteEstado",
      // },
      {
        label: "Acciones",
        field: "acciones",
      },
    ],

    rows: pacientesFilter,
  };

  // console.log(pacientes);
  // console.log("fromListaPacientes2");

  const eliminar = (pacienteDni) => {
    Swal.fire({
      title: "¿Seguro de eliminar paciente?",
      icon: "error",
      text: "Los cambios serán irreversibles",
      showCancelButton: true,
    }).then((rpta) => {
      if (rpta.isConfirmed) {
        setPacienteDetalle(false);
        deletePaciente(pacienteDni).then((data) => {
          if (data.success === true) {
            obtenerPacientes();
            setPacienteDetalle(false);
            Swal.fire({
              title: "Eliminado",
              icon: "success",
              timer: 800,
              showCancelButton: false,
              position: "top-center",
            });
          }
        });
      }
    });
  };

  return (
    <section className="col-md-9">
      {cargandoPacientes ? (
        <div className="card shadow">
          <div className="card-title text-center mt-3">
            <h4>Cargando Listado de Pacientes</h4>
          </div>
          <div className="card-body text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Cargando...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="card shadow">
          <div className="card-title text-center mt-3">
            <h3>Listado de Pacientes</h3>
          </div>
          <div className="card-body ">
            <div className="row ">
              <div className="col text-right">
                <button
                  className="btn btn-success rounded-circle mx-1"
                  onClick={() => {
                    obtenerPacientes();
                    setPacienteDetalle(false);
                  }}
                >
                  <i className="fa fa-refresh" aria-hidden="true"></i>
                  {/**Boton refresh */}
                </button>
                <button
                  className="btn btn-success rounded-circle mx-1"
                  onClick={() => {
                    setmodalCrearPaciente(true);
                  }}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                  {/*boton (+) */}
                </button>
              </div>
            </div>
            <div className="table-responsive">
              <MDBDataTable
                data={data}
                responsive
                striped
                hover
                bordered
                displayEntries={false}
                entries={15}
                fixed
                infoLabel={["Mostrando", "a", "de", "pacientes"]}
                paginationLabel={["Anterior", "Siguiente"]}
                searchLabel="Buscar..."
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ListaPacientes;
