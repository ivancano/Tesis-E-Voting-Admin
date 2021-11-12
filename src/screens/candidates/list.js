import React, { useState, useEffect } from "react";
import {
    Link
} from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import CandidateService from "../../services/candidates";

const CandidatesList = () => {

    const [candidates, setCandidates] = useState([])

    useEffect(() => {
        CandidateService.getAll()
        .then(data => {
            setCandidates(data)
        })
    }, []);

    const deleteRow = (id) => {
        if(window.confirm('¿Está seguro que desea borrar este registro?')) {
            CandidateService.delete(id);
            window.location.reload();
        }
    }
    
    const columnLabels = ['Nombre', 'Apellido', 'Partido'];

    return (
        <>
            <h4>Candidatos</h4>
            <div className="table-wrapper">
                <Link to={'/candidates/new'} className="btn btn-sm btn-primary">
                    Nuevo Candidato
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Partido</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.length > 0 && candidates.map((i, k) => (
                            <tr>
                                <td>{i.name}</td>
                                <td>{i.lastname}</td>
                                <td>{i.party.name}</td>
                                <td>
                                    <Link to={'candidates/show/' + i.id} className="btn btn-sm btn-secondary">
                                        Ver
                                    </Link>
                                    <Link to={'candidates/edit/' + i.id} className="btn btn-sm btn-primary">
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

export default CandidatesList;