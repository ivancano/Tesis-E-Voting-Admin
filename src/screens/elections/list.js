import React, { useState, useEffect } from "react";
import Moment from 'react-moment';
import {
    Link
} from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ElectionService from "../../services/elections";

const ElectionsList = () => {

    const [elections, setElections] = useState([])

    useEffect(() => {
        ElectionService.getAll()
        .then(data => {
            setElections(data)
        })
    }, []);

    const deleteRow = (id) => {
        if(window.confirm('¿Está seguro que desea borrar este registro?')) {
            ElectionService.delete(id).then(() => {
                window.location.reload();
            });
        }
    }
    
    const columnLabels = ['Nombre', 'Fecha de Inicio', 'Fecha de Fin', 'Estado'];

    return (
        <>
            <h4>Elecciones</h4>
            <div className="table-wrapper">
                <Link to={'/elections/new'} className="btn btn-sm btn-primary">
                    Nueva Elección
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Fecha de Inicio</th>
                            <th>Fecha de Fin</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elections.length > 0 && elections.map((i, k) => (
                            <tr>
                                <td>{i.name}</td>
                                <td>
                                    <Moment format="DD/MM/YYYY HH:mm">{i.startTime}</Moment>
                                </td>
                                <td>
                                    <Moment format="DD/MM/YYYY HH:mm">{i.endTime}</Moment>
                                </td>
                                <td>{i.status ? 'Activa' : 'Inactiva'}</td>
                                <td>
                                    <Link to={'elections/show/' + i.id} className="btn btn-sm btn-secondary">
                                        Ver
                                    </Link>
                                    <Link to={'elections/details/' + i.id} className="btn btn-sm btn-secondary">
                                        Candidatos
                                    </Link>
                                    <Link to={'elections/edit/' + i.id} className="btn btn-sm btn-primary">
                                        Editar
                                    </Link>
                                    <Button size="sm" variant="danger" onClick={() => deleteRow(i.id)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default ElectionsList;