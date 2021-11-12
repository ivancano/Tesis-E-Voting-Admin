import React, { useEffect, useState } from "react";
import ShowForm from "../../components/ShowForm";
import CandidateService from "../../services/candidates";


const CandidatesShow = (props) => {

    const [candidate, setCandidate] = useState(null)
    useEffect(() => {
        const id = props.match.params.id;
        CandidateService.getById(id)
        .then(data => {
            setCandidate([
                {
                    label: 'Nombre',
                    type: 'text',
                    value: data.name
                },
                {
                    label: 'Apellido',
                    type: 'text',
                    value: data.lastname
                },
                {
                    label: 'Partido',
                    type: 'text',
                    value: data.party.name
                },
            ])
        })
    }, [])
    
    const fields = [
        {
            label: 'Label 1',
            type: 'text',
            value: 'Value 1'
        },
        {
            label: 'Label 2',
            type: 'text',
            value: 'Value 2'
        },
        {
            label: 'Label 3',
            type: 'text',
            value: 'Value 3'
        },
    ];

    return (
        <>
            <h4>Información de Candidato</h4>
            <ShowForm fields={candidate} cancelLink={"/candidates"} />
        </>
    );
}

export default CandidatesShow;