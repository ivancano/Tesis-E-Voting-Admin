import React, { useEffect, useState } from "react";
import ShowForm from "../../components/ShowForm";
import ElectionsService from "../../services/elections";
import CandidateService from "../../services/candidates";
import Table from "react-bootstrap/Table";
import {
    Link
} from "react-router-dom";


const VoteCounter = (props) => {
    const [votes, setVotes] = useState(null)
    const [candidates, setCandidates] = useState([]);
    useEffect(() => {
        const id = props.match.params.id;
        CandidateService.getAll()
        .then(dataCandidates => {
            setCandidates(dataCandidates);
            ElectionsService.getVotes(id)
            .then(data => {
                setVotes(data)
            })
        })
    }, [])

    return (
        <>
            <h4>Conteo de Votos</h4>
            {votes !== null && Object.keys(votes).map(k => (
                <>
                <p><strong>Cargo:</strong> {k}</p>
                <p><strong>Votos por candidato</strong></p>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Candidato</th>
                            <th>Votos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {votes[k].map((v, k) => {
                            const keys = Object.keys(v);
                            const cand = candidates?.filter(c => c.id == keys[0]);
                            return (
                                <tr>
                                    <td>{cand.length > 0 ? cand[0].name : ''}</td>
                                    <td>{v[keys[0]]}</td>
                                    <td><Link to={'/elections/vote-counter-detail/'+props.match.params.id+'/'+keys[0]} className="btn btn-sm btn-secondary">Detalles</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                </>
            )
            )}
        </>
    );
}

export default VoteCounter;