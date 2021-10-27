import React, { Component } from "react";
import {
    Link
} from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const TableList = (props) => {

    const deleteRow = (id) => {
        window.confirm('¿Está seguro que desea borrar este registro?')
    }

    return (
        <div className="table-wrapper">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {props.columnLabels && props.columnLabels.map(i => (<th>{i}</th>))}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {props.rowValues && props.rowValues.map(i => (
                        <tr>
                            <td>value 1</td>
                            <td>value 2</td>
                            <td>value 3</td>
                            <td>value 4</td>
                            <td>
                                <Link to={props.baseLink + '/show/' + i.id} className="btn btn-sm btn-secondary">
                                    Ver
                                </Link>
                                <Link to={props.baseLink + '/edit/' + i.id} className="btn btn-sm btn-primary">
                                    Editar
                                </Link>
                                <Button size="sm" variant="danger" onClick={() => deleteRow(i.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TableList