import React, {useState, useEffect} from "react";
import {
    Link,
    useHistory
} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CandidateService from "../../services/candidates";
import PartyService from "../../services/parties";

const CandidatesNew = (props) => {
    const history = useHistory();
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [party, setParty] = useState('')
    const [parties, setParties] = useState([])
    useEffect(() => {
        PartyService.getAll()
        .then(data => {
            setParties(data)
        })
    }, [])

    const save = () => {
        CandidateService.create({name: name, lastname: lastname, partyId: party})
        .then(data => {
            history.push("/candidates");
        });
    }

    return (
        <>
            <h4>Nuevo Candidato</h4>
            <div className="form-wrapper">
                <Form onSubmit={props.onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type={'text'} onChange={e => setName(e.target.value)} value={name} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type={'text'} onChange={e => setLastname(e.target.value)} value={lastname} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Partido Político</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={e => setParty(e.target.value)}>
                            <option>Seleccione un Partido</option>
                            {parties.map(p => (
                                <option selected={p.id == party} value={p.id}>{p.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className="pull-right">
                        <Link to={'/candidates'} className="btn btn-danger btn-block">Cancelar</Link>
                        <Button className="btn btn-primary" onClick={save}>Guardar</Button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default CandidatesNew;