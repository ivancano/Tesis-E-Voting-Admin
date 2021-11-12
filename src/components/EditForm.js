import React, { useEffect, useState } from "react";
import {
    Link
} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CandidateService from "../services/candidates";

const EditForm = (props) => {
    const [candidate, setCandidate] = useState(null)

    useEffect(() => {
        setCandidate(props.fields)
        console.log(Object.values(props.fields));
    }, [])

    const handleChange = event => {
        
        event.target.name = event.target.value
    }

    const save = () => {
        console.log(candidate);
    }

    return (
        <div className="form-wrapper">
            <Form onSubmit={props.onSubmit}>
                {
                    candidate !== null && Object.values(candidate).map(f => (
                        <Form.Group className="mb-3">
                            <Form.Label>{f.label}</Form.Label>
                            <Form.Control type={f.type} name={f.label} onChange={handleChange} value={f.value} />
                        </Form.Group>
                    ))
                }
                <div className="pull-right">
                    <Link to={props.cancelLink} className="btn btn-danger btn-block">Cancelar</Link>
                    <Button className="btn btn-primary" onClick={save} type="submit">Guardar</Button>
                </div>
            </Form>
        </div>
    );
}

export default EditForm