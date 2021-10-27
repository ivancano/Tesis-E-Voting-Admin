import React from "react";
import EditForm from "../../components/EditForm";

const CandidatesEdit = () => {
    
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
            <h4>Editar Candidato</h4>
            <EditForm fields={fields} cancelLink={"/candidates"} />
        </>
    );
}

export default CandidatesEdit;