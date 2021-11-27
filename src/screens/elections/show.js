import React, { useEffect, useState } from "react";
import ShowForm from "../../components/ShowForm";
import ElectionsService from "../../services/elections";


const ElectionsShow = (props) => {

    const [election, setElection] = useState(null)
    useEffect(() => {
        const id = props.match.params.id;
        ElectionsService.getById(id)
        .then(data => {
            setElection([
                {
                    label: 'Nombre',
                    type: 'text',
                    value: data.name
                },
                {
                    label: 'Descripción',
                    type: 'text',
                    value: data.description
                },
                {
                    label: 'Fecha de Inicio',
                    type: 'date',
                    value: data.startTime
                },
                {
                    label: 'Fecha de Fin',
                    type: 'date',
                    value: data.endTime
                },
                {
                    label: 'Estado',
                    type: 'boolean',
                    value: data.status
                },
            ])
        })
    }, [])

    return (
        <>
            <h4>Información de Elección</h4>
            <ShowForm fields={election} cancelLink={"/elections"} />
        </>
    );
}

export default ElectionsShow;