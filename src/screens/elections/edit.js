import React, {useState, useEffect} from "react";
import {
    Link,
    useHistory
} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ElectionService from "../../services/elections";

const ElectionsEdit = (props) => {
    const history = useHistory();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [status, setStatus] = useState(true)
    const id = props.match.params.id;
    useEffect(() => {
        ElectionService.getById(id)
        .then(data => {
            setName(data.name)
            setDescription(data.description)
            setStartTime(new Date(data.startTime))
            setEndTime(new Date(data.endTime))
            setStatus(data.status)
        })
    }, [])

    const save = () => {
        ElectionService.update(id, {name: name, description: description, startTime: startTime, endTime: endTime, status: status})
        .then(data => {
            history.push("/elections");
        });
    }

    return (
        <>
            <h4>Editar Elección</h4>
            <div className="form-wrapper">
                <Form onSubmit={props.onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type={'text'} onChange={e => setName(e.target.value)} value={name} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control type={'text'} onChange={e => setDescription(e.target.value)} value={description} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha de Inicio</Form.Label>
                        <DatePicker dateFormat="Pp" showTimeSelect selected={startTime} onChange={(date) => setStartTime(date)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha de Fin</Form.Label>
                        <DatePicker dateFormat="Pp" showTimeSelect selected={endTime} onChange={(date) => setEndTime(date)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={e => setStatus(e.target.value)}>
                            <option selected={status == false} value={false}>Inactivo</option>
                            <option selected={status == true} value={true}>Activo</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="pull-right">
                        <Link to={'/elections'} className="btn btn-danger btn-block">Cancelar</Link>
                        <Button className="btn btn-primary" onClick={save}>Guardar</Button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default ElectionsEdit;