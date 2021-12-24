import React, { useState, useEffect } from "react";
import {
    Link
} from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import VoterService from "../../services/voters";

const VotersList = () => {

    const [voters, setVoters] = useState([])

    useEffect(() => {
        VoterService.getAll()
        .then(data => {
            setVoters(data)
        })
    }, []);

    const deleteRow = (id) => {
        if(window.confirm('¿Está seguro que desea borrar este registro?')) {
            VoterService.delete(id);
            window.location.reload();
        }
    }
    
    const columnLabels = ['Nombre', 'Apellido', 'DNI', 'Estado'];

    return (
        <>
            <h4>Votantes</h4>
            <div className="table-wrapper">
                <Link to={'/voters/new'} className="btn btn-sm btn-primary">
                    Nuevo Votante
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {voters.length > 0 && voters.map((i, k) => (
                            <tr>
                                <td>{i.name}</td>
                                <td>{i.lastname}</td>
                                <td>{i.dni}</td>
                                <td>{i.status ? 'Activo' : 'Inactivo'}</td>
                                <td>
                                    <Link to={'voters/show/' + i.id} className="btn btn-sm btn-secondary">
                                        Ver
                                    </Link>
                                    <Link to={'voters/edit/' + i.id} className="btn btn-sm btn-primary">
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

export default VotersList;