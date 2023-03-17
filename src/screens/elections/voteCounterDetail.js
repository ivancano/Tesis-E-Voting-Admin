import React, { useEffect, useState } from "react";
import ShowForm from "../../components/ShowForm";
import ElectionsService from "../../services/elections";
import CandidateService from "../../services/candidates";
import Table from "react-bootstrap/Table";


const VoteCounterDetail = (props) => {console.log("entro")
    const [votes, setVotes] = useState([])
    const [election, setElection] = useState(null)
    const [candidate, setCandidate] = useState(null)
    useEffect(() => {
        const promises = [getElection(), getCandidate(), getVotes()]
        Promise.all(promises)
        .then(([dataElection, dataCandidate, dataVotes]) => {
            setElection(dataElection)
            setCandidate(dataCandidate)
            setVotes(dataVotes)
        })
    }, [])

    const getElection = () => {
        const id = props.match.params.id;
        return ElectionsService.getById(id);
    }

    const getCandidate = () => {
        const candidateId = props.match.params.candidateId;
        return CandidateService.getById(candidateId)
    }

    const getVotes = () => {
        const candidateId = props.match.params.candidateId;
        const id = props.match.params.id;
        return ElectionsService.getVotesDetail(id, candidateId);
    }

    return (
        <>
            <h4>Conteo de Votos</h4>
            {election && candidate && (
                <>
                <p><strong>Elección:</strong> {election.name}</p>
                <p><strong>Candidato:</strong> {candidate.name} {candidate.lastname}</p>
                <p><strong>Votos</strong></p>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Blockchain ID</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {votes.map(v => (
                            <tr>
                                <td>{v.id}</td>
                                <td><a className="btn btn-sm btn-secondary" href={'http://localhost:9984/api/v1/transactions/'+v.id} target="_blank" rel="noreferrer">Ver en Blockchain</a></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </>
            )}
        </>
    );
}

export default VoteCounterDetail;