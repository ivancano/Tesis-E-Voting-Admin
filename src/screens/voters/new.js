import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import {
    Link,
    useHistory
} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import VoterService from "../../services/voters";

const VotersNew = (props) => {
    const history = useHistory();
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = formData => {
        VoterService.create(formData)
        .then(data => {
            history.push("/voters");
        });
    }

    return (
        <>
            <h4>Nuevo Votante</h4>
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
                        <Form.Label>DNI</Form.Label>
                        <Form.Control type={'text'} {...register("dni", { required: true })} aria-invalid={errors.dni ? "true" : "false"} />
                        {errors.dni?.type === 'required' && <p className="text-danger">DNI requerido</p>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select {...register("status")}>
                            <option value={true}>Activo</option>
                            <option value={false}>Inactivo</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="pull-right">
                        <Link to={'/voters'} className="btn btn-danger btn-block">Cancelar</Link>
                        <Button className="btn btn-primary" type="submit">Guardar</Button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default VotersNew;