import React, { Component } from "react";
import {
    Link
} from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const TableList = (props) => {
    console.log(props);
    return (
        <div className="table-wrapper">
            <Link to={props.newButtonLink} className="btn btn-sm btn-primary">
                { props.newButtonText }
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {props.columnLabels && props.columnLabels.map(i => (<th>{i}</th>))}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {props.rowValues && props.rowValues.map((i, k) => (
                        <tr>
                            <td>{i[1]}</td>
                            <td>{i[2]}</td>
                            <td>{i[3]}</td>
                            <td>
                                <Link to={props.baseLink + '/show/' + i[0]} className="btn btn-sm btn-secondary">
                                    Ver
                                </Link>
                                <Link to={props.baseLink + '/edit/' + i[0]} className="btn btn-sm btn-primary">
                                    Editar
                                </Link>
                                <Button size="sm" variant="danger" onClick={() => props.deleteRow(i[0])}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TableList