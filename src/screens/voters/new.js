import React, {useState, useEffect} from "react";
import {
    Link,
    useHistory
} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import VoterService from "../../services/voters";

const VotersNew = (props) => {
    const history = useHistory();
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [dni, setDni] = useState('')
    const [status, setStatus] = useState(true)

    const save = () => {
        VoterService.create({name: name, lastname: lastname, dni: dni, status: status})
        .then(data => {
            history.push("/voters");
        });
    }

    return (
        <>
            <h4>Nuevo Votante</h4>
            <div className="form-wrapper">
                <Form onSubmit={props.onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type={'text'} onChange={e => setName(e.target.value)} value={name} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type={'text'} onChange={e => setLastname(e.target.value)} value={lastname} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control type={'text'} onChange={e => setDni(e.target.value)} value={dni} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={e => setStatus(e.target.value)}>
                            <option selected={status == false} value={false}>Inactivo</option>
                            <option selected={status == true} value={true}>Activo</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="pull-right">
                        <Link to={'/voters'} className="btn btn-danger btn-block">Cancelar</Link>
                        <Button className="btn btn-primary" onClick={save}>Guardar</Button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default VotersNew;