import React from "react";
import ShowForm from "../../components/ShowForm";

const CandidatesShow = () => {
    
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
            <ShowForm fields={fields} cancelLink={"/candidates"} />
        </>
    );
}

export default CandidatesShow;