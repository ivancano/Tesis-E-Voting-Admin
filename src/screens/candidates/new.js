import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import {
    Link,
    useHistory
} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CandidateService from "../../services/candidates";
import PartyService from "../../services/parties";

const CandidatesNew = (props) => {
    const history = useHistory();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [parties, setParties] = useState([])
    useEffect(() => {
        PartyService.getAll()
        .then(data => {
            setParties(data)
        })
    }, [])

    const onSubmit = formData => {
        CandidateService.create(formData)
        .then(data => {
            history.push("/candidates");
        });
    }

    return (
        <>
            <h4>Nuevo Candidato</h4>
            <div className="form-wrapper">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type={'text'} {...register("name", { required: true })} aria-invalid={errors.name ? "true" : "false"} />
                        {errors.name?.type === 'required' && <p className="text-danger">Nombre requerido</p>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type={'text'} {...register("lastname", { required: true })} aria-invalid={errors.lastname ? "true" : "false"} />
                        {errors.lastname?.type === 'required' && <p className="text-danger">Apellido requerido</p>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Partido Político</Form.Label>
                        <Form.Select {...register("partyId")}>
                            {parties.map(p => (
                                <option value={p.id}>{p.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className="pull-right">
                        <Link to={'/candidates'} className="btn btn-danger btn-block">Cancelar</Link>
                        <Button className="btn btn-primary" type="submit">Guardar</Button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default CandidatesNew;