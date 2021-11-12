import React, { useState, useEffect } from "react";
import {
    Link
} from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import TableList from "../../components/TableList";
import PartyService from "../../services/parties";

const PartiesList = () => {

    const [parties, setParties] = useState([])

    useEffect(() => {
        PartyService.getAll()
        .then(data => {
            setParties(data)
        })
    }, []);

    const deleteRow = (id) => {
        if(window.confirm('¿Está seguro que desea borrar este registro?')) {
            PartyService.delete(id);
            window.location.reload();
        }
    }
    
    const columnLabels = ['Nombre', 'Estado'];

    return (
        <>
            <h4>Candidatos</h4>
            <div className="table-wrapper">
                <Link to={'/parties/new'} className="btn btn-sm btn-primary">
                    Nuevo Partido Político
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {columnLabels && columnLabels.map(i => (<th>{i}</th>))}
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parties && parties.map((i, k) => (
                            <tr>
                                <td>{i.name}</td>
                                <td>{i.status ? 'Activo' : 'Inactivo'}</td>
                                <td>
                                    <Link to={'parties/show/' + i.id} className="btn btn-sm btn-secondary">
                                        Ver
                                    </Link>
                                    <Link to={'parties/edit/' + i.id} className="btn btn-sm btn-primary">
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

export default PartiesList;