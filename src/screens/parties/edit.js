import React, {useState, useEffect} from "react";
import {
    Link,
    useHistory
} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PartyService from "../../services/parties";

const PartiesEdit = (props) => {
    const history = useHistory();
    const [name, setName] = useState('')
    const [status, setStatus] = useState(true)
    const id = props.match.params.id;
    useEffect(() => {
        PartyService.getById(id)
        .then(data => {
            setName(data.name)
            setStatus(data.status)
        })
    }, [])

    const save = () => {
        PartyService.update(id, {name: name, status: status})
        .then(data => {
            history.push("/parties");
        });
    }

    return (
        <>
            <h4>Editar Partido Político</h4>
            <div className="form-wrapper">
                <Form onSubmit={props.onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type={'text'} onChange={e => setName(e.target.value)} value={name} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={e => setStatus(e.target.value)}>
                            <option selected={status == false} value={false}>Inactivo</option>
                            <option selected={status == true} value={true}>Activo</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="pull-right">
                        <Link to={'/parties'} className="btn btn-danger btn-block">Cancelar</Link>
                        <Button className="btn btn-primary" onClick={save}>Guardar</Button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default PartiesEdit;