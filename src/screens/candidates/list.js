import React from "react";
import TableList from "../../components/TableList";

const CandidatesList = () => {
    
    const columnLabels = ['column 1', 'column 2', 'column 3', 'column 4'];
    const rowValues = [
        {
            id: '1',
            a: 'value 1',
            b: 'value 2',
            c: 'value 3',
            d: 'value 4'
        },
        {
            id: '2',
            a: 'value 1',
            b: 'value 2',
            c: 'value 3',
            d: 'value 4'
        },
        {
            id: '3',
            a: 'value 1',
            b: 'value 2',
            c: 'value 3',
            d: 'value 4'
        }
    ]

    return (
        <>
            <h4>Candidatos</h4>
            <TableList columnLabels={columnLabels} rowValues={rowValues} baseLink={"/candidates"} />
        </>
    );
}

export default CandidatesList;