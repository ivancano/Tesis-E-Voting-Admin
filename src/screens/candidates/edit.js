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

const CandidatesEdit = (props) => {
    const history = useHistory();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [parties, setParties] = useState([])
    const id = props.match.params.id;
    useEffect(() => {
        PartyService.getAll()
        .then(data => {
            setParties(data)
            CandidateService.getById(id)
            .then(data => {
                let defaultValues = {};
                defaultValues.name = data.name;
                defaultValues.lastname = data.lastname;
                defaultValues.partyId = data.partyId;
                reset({ ...defaultValues });
            })
        })
    }, [])

    const onSubmit = formData => {
        CandidateService.update(id, formData)
        .then(data => {
            history.push("/candidates");
        });
    }

    return (
        <>
            <h4>Editar Candidato</h4>
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

export default CandidatesEdit;