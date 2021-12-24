import React, { useState, useEffect } from "react";
import Moment from 'react-moment';
import {
    Link
} from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ElectionService from "../../services/elections";
import CandidateService from "../../services/candidates";
import PartyService from "../../services/parties";

const ElectionDetails = (props) => {

    const [parties, setParties] = useState([])
    const [candidates, setCandidates] = useState([])
    const [partySelected, setPartySelected] = useState(null)
    const [candidateSelected, setCandidateSelected] = useState(null)
    const [position, setPosition] = useState('')
    const [list, setList] = useState([])

    useEffect(() => {
        PartyService.getAll()
        .then(data => {
            setParties(data)
        })
        ElectionService.getDetails(props.match.params.id)
        .then(data => {
            setList(data)
        })
    }, []);

    const setPartySelectedEvent = (e) => {
        setPartySelected(e.target.value)
        CandidateService.getByParty(e.target.value)
        .then(data => {
            setCandidates(data)
        })
    }

    const deleteRow = (id) => {
        if(window.confirm('¿Está seguro que desea borrar este registro?')) {
            ElectionService.deleteDetail(id).then(() => {
                window.location.reload();
            });
        }
    }

    const save = () => {
        ElectionService.createDetail({
            electionId: props.match.params.id,
            candidateId: candidateSelected,
            partyId: partySelected,
            position: position
        })
        .then(data => {
            window.location.reload();
        });
    }
    
    const columnLabels = ['Nombre', 'Fecha de Inicio', 'Fecha de Fin', 'Estado'];

    return (
        <>
            <h4>Elección - Candidatos</h4>
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Partido Político</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={setPartySelectedEvent}>
                            <option>Seleccione un Partido</option>
                            {parties.map(p => (
                                <option selected={p.id == partySelected} value={p.id}>{p.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Candidatos</Form.Label>
                        <Form.Select disabled={partySelected == null || candidates.length == 0} aria-label="Default select example" onChange={e => setCandidateSelected(e.target.value)}>
                            <option>Seleccione un Candidato</option>
                            {candidates.map(p => (
                                <option selected={p.id == candidateSelected} value={p.id}>{p.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Posición</Form.Label>
                        <Form.Control disabled={partySelected == null || candidates.length == 0} type={'text'} onChange={e => setPosition(e.target.value)} value={position} />
                    </Form.Group>
                    <div className="pull-right">
                        <Link to={'/elections'} className="btn btn-danger btn-block">Cancelar</Link>
                        <Button className="btn btn-primary" onClick={save}>Guardar</Button>
                    </div>
                </Form>
            </div>
            <div className="table-wrapper">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Partido</th>
                            <th>Candidato</th>
                            <th>Posición</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.length > 0 && list.map((i, k) => (
                            <tr>
                                <td>{i.party.name}</td>
                                <td>{i.candidate.name}</td>
                                <td>{i.position}</td>
                                <td>
                                    <Link to={'elections/edit/' + i.id} className="btn btn-sm btn-primary">
                                        Editar
                                    </Link>
                                    <Button size="sm" variant="danger" onClick={() => deleteRow(i.id)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default ElectionDetails;