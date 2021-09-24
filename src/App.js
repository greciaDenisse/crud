import React,{useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
function App() {

  const dataLugares= [{clave:0,fotografia: '',nombre:'',edad:'',sexo:'',salario:''},];
const [data,setData]=useState(dataLugares);
const [modalEditar,setModalEditar]=useState(false);
const [modalEliminar,setModalEliminar]=useState(false);
const [modalInsertar,setModalInsertar]=useState(false);


const handleChangeImg=()=>{
  let name="fotografia";
  let value=document.getElementById(name).files[0];
  setRegSelec((prevState)=>(
    {
      ...prevState,
      [name]:URL.createObjectURL(value)
    }))
}

const [regSelec,setRegSelec]=useState({
  clave:'',
  fotografia:'',
  nombre:'',
  edad:'',
  sexo:'',
  salario:''
});

const selecReg=(elemento,caso)=>{
  setRegSelec(elemento);
  (caso==='Editar')?setModalEditar(true):setModalEliminar(true);
}

const handleChange=e=>{
  const {name,value}=e.target;
  setRegSelec((prevState)=>(
    {
      ...prevState,[name]:value
    }));
}
const editar=()=>{
  var dataNueva=data;
  dataNueva.map(datos=>{
if(datos.clave==regSelec.clave){
  datos.fotografia=regSelec.fotografia;
  datos.nombre=regSelec.nombre;
  datos.edad=regSelec.edad;
  datos.sexo=regSelec.sexo;
  datos.salario=regSelec.salario;
}
  });
  setData(dataNueva);
  setModalEditar(false);
}

const eliminar = () => {
  setData(data.filter(datos=>datos.clave!==regSelec.clave));
  setModalEliminar(false);
}
const openModalAdd = () => {
  setRegSelec(null);
  setModalInsertar(true);
}
 const insertar = () => {
  var valorInsertar=regSelec;
  valorInsertar.clave=data[data.length-1].clave+1;
  var datoNuevo=data;
  datoNuevo.push(valorInsertar);
  setData(datoNuevo);
  setModalInsertar(false);
 }
  return (
    
    <div className="App">
      <br />
  <button className="btn btn-success" onClick={()=>openModalAdd()}>Insertar</button>  
 <br />
 <br />
      <table className="table table-bordered">
        <thead>
          <tr>
          <th>CLAVE</th>
          <th>FOTOGRAFIA</th>
          <th>NOMBRE</th>
          <th>EDAD</th>
          <th>SEXO</th>
          <th>SALARIO</th>
          <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {   
          (data.length==1)?null:data.slice(1,data.length).map(elemento=>(
            <tr>
              <td>{elemento.clave}</td>
              <td><img src={elemento.fotografia}></img></td>
               <td>{elemento.nombre}</td>
              <td>{elemento.edad}</td>
              <td>{elemento.sexo}</td>
              <td>{elemento.salario}</td>
              <td><button className="btn btn-primary" onClick={()=>selecReg(elemento, 'Editar')}>Editar</button>
              <button className="btn btn-danger" onClick={()=>selecReg(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Registro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Clave</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="clave"
              value={regSelec && regSelec.clave}
            />
            <br />

            <label>Fotografia</label>
            <input
              className="form-control"
              id="fotografia"
              type="file"
              name="fotografia"
              onChange={handleChangeImg}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={regSelec && regSelec.nombre}
              onChange={handleChange}
            />
            <br />
            <label>Edad</label>
            <input
              className="form-control"
              type="text"
              name="edad"
              value={regSelec && regSelec.edad}
              onChange={handleChange}
            />
            <br />
            <label>Sexo</label>
            <input
              className="form-control"
              type="text"
              name="sexo"
              value={regSelec && regSelec.sexo}
              onChange={handleChange}
            />
            <br />
            <label>Salario</label>
            <input
              className="form-control"
              type="text"
              name="salario"
              value={regSelec && regSelec.salario}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger" onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el registro {regSelec && regSelec.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

<Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar registro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Clave</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="clave"
              value={data[data.length-1].clave+1}
            />
            <br />

            <label>Fotografia</label>
            <input
              className="form-control"
              type="file"
              id="fotografia"
              name="fotografia"
              onChange={handleChangeImg}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={regSelec ? regSelec.nombre: ''}
              onChange={handleChange}
            />
            <br />
            <label>Edad</label>
            <input
              className="form-control"
              type="text"
              name="edad"
              value={regSelec ? regSelec.edad: ''}
              onChange={handleChange}
            />
            <br />
            <label>Sexo</label>
            <input
              className="form-control"
              type="text"
              name="sexo"
              value={regSelec ? regSelec.sexo: ''}
              onChange={handleChange}
            />
            <br />
            <label>Salario</label>
            <input
              className="form-control"
              type="text"
              name="salario"
              value={regSelec ? regSelec.salario: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
