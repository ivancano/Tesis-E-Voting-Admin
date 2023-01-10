import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import {
    Link,
    useHistory
} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PartyService from "../../services/parties";

const PartiesEdit = (props) => {
    const history = useHistory();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const id = props.match.params.id;
    useEffect(() => {
        PartyService.getById(id)
        .then(data => {
            let defaultValues = {};
            defaultValues.name = data.name;
            defaultValues.status = data.status;
            reset({ ...defaultValues });
        })
    }, [])

    const onSubmit = formData => {
        PartyService.update(id, formData)
        .then(data => {
            history.push("/parties");
        });
    }

    return (
        <>
            <h4>Editar Partido Político</h4>
            <div className="form-wrapper">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type={'text'} {...register("name", { required: true })} aria-invalid={errors.name ? "true" : "false"} />
                        {errors.name?.type === 'required' && <p className="text-danger">Nombre requerido</p>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select {...register("status")}>
                            <option value={true}>Activo</option>
                            <option value={false}>Inactivo</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="pull-right">
                        <Link to={'/parties'} className="btn btn-danger btn-block">Cancelar</Link>
                        <Button className="btn btn-primary" type="submit">Guardar</Button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default PartiesEdit;