import React, {useState, useEffect} from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Link,
    useHistory
} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ElectionsService from "../../services/elections";

const ElectionsNew = (props) => {
    const history = useHistory();
    const { register, formState: { errors }, handleSubmit, control } = useForm();

    const onSubmit = formData => {
        ElectionsService.create(formData)
        .then(data => {
            history.push("/elections");
        });
    }

    return (
        <>
            <h4>Nueva Elección</h4>
            <div className="form-wrapper">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type={'text'} {...register("name", { required: true })} aria-invalid={errors.name ? "true" : "false"} />
                        {errors.name?.type === 'required' && <p className="text-danger">Nombre requerido</p>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control type={'text'} {...register("description", { required: true })} aria-invalid={errors.description ? "true" : "false"} />
                        {errors.description?.type === 'required' && <p className="text-danger">Descripción requerida</p>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha de Inicio</Form.Label>
                        <Controller
                            name="startTime"
                            rules={{ required: true }}
                            control={control}
                            aria-invalid={errors.startTime ? "true" : "false"}
                            render={({ field }) => (
                                <DatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="Pp"
                                    showTimeSelect
                                />
                            )}
                        />
                        {errors.startTime?.type === 'required' && <p className="text-danger">Fecha de inicio requerida</p>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha de Fin</Form.Label>
                        <Controller
                            name="endTime"
                            rules={{ required: true }}
                            control={control}
                            aria-invalid={errors.startTime ? "true" : "false"}
                            render={({ field }) => (
                                <DatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="Pp"
                                    showTimeSelect
                                />
                            )}
                        />
                        {errors.endTime?.type === 'required' && <p className="text-danger">Fecha de fin requerida</p>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select {...register("status")}>
                            <option value={true}>Activo</option>
                            <option value={false}>Inactivo</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="pull-right">
                        <Link to={'/elections'} className="btn btn-danger btn-block">Cancelar</Link>
                        <Button className="btn btn-primary" type="submit">Guardar</Button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default ElectionsNew;