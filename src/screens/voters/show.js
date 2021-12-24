import React, { useEffect, useState } from "react";
import {
    Link
} from "react-router-dom";
import VoterService from "../../services/voters";


const VotersShow = (props) => {

    const [voter, setVoter] = useState({
        name: '',
        lastname: '',
        dni: '',
        status: ''
    })
    useEffect(() => {
        const id = props.match.params.id;
        VoterService.getById(id)
        .then(data => {
            setVoter(data)
        })
    }, [])

    return (
        <>
            <h4>Información de Votante</h4>
            <div className="form-wrapper">
                <p><strong>Nombre:</strong> {voter.name}</p>
                <p><strong>Apellido:</strong> {voter.lastname}</p>
                <p><strong>DNI:</strong> {voter.dni}</p>
                <p><strong>Estado:</strong> {voter.status ? 'Activo' : 'Inactivo'}</p>
                <div className="pull-right">
                    <Link to={'/voters'} className="btn btn-danger btn-block">Cancelar</Link>
                </div>
            </div>
        </>
    );
}

export default VotersShow;