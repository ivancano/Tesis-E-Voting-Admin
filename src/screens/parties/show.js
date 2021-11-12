import React, { useEffect, useState } from "react";
import {
    Link
} from "react-router-dom";
import PartyService from "../../services/parties";


const PartiesShow = (props) => {

    const [party, setParty] = useState({
        name: '',
        status: ''
    })
    useEffect(() => {
        const id = props.match.params.id;
        PartyService.getById(id)
        .then(data => {
            setParty(data)
        })
    }, [])

    return (
        <>
            <h4>Información de Partido</h4>
            <div className="form-wrapper">
                <p><strong>Nombre:</strong> {party.name}</p>
                <p><strong>Estado:</strong> {party.status ? 'Activo' : 'Inactivo'}</p>
                <div className="pull-right">
                    <Link to={'/parties'} className="btn btn-danger btn-block">Cancelar</Link>
                </div>
            </div>
        </>
    );
}

export default PartiesShow;