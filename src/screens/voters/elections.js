import React, {useState, useEffect} from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Link,
    useHistory
} from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import VoterService from "../../services/voters";
import ElectionService from "../../services/elections";
import { useCallback } from "react";
import Table from "react-bootstrap/Table";

const VotersElections = (props) => {
    const history = useHistory();
    const [elections, setElections] = useState([]);
    const [currentElections, setCurrentElections] = useState([]);
    const [selected, setSelected] = useState([]);
    const [multiselectPreselectedValues, setMultiselectPreselectedValues] = useState([])
    const { register, formState: { errors }, handleSubmit, control } = useForm();
    const id = props.match.params.id;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getElectionName = useCallback((electionId) => {
        const electionFiltered = elections.filter(e => e.value == electionId)
        if(electionFiltered.length > 0) {
            return electionFiltered[0].label
        }
        return null
    })
    
    useEffect(() => {
        VoterService.getById(id)
        .then(dataVoter => {
            VoterService.getElectionsByVoter(id)
            .then(dataVoterElection => {
                setCurrentElections(dataVoterElection)
                ElectionService.getAll()
                .then(data => {
                    const electionsData = [];
                    for(const d of data) {
                        electionsData.push({
                            label: d.name,
                            value: d.id
                        })
                    }
                    setElections(electionsData);
                })
            })
        })
    }, [])

    useEffect(() => {
        const setDefVal = []
        for(const dv of currentElections) {
            setDefVal.push({label: getElectionName(dv.electionId), value: dv.electionId})
        }
        setMultiselectPreselectedValues(setDefVal)
    }, [elections, currentElections])

    const onSubmit = formData => {
        const params = [];
        for(const f of formData.elections) {
            params.push(f.value);
        }
        VoterService.assignToElections(id, {electionIds: params})
        .then(data => {
            window.location.reload();
        })
    }

    return (
        <>
            <h4>Asignar Elecciones</h4>
            <div className="form-wrapper">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Controller
                            control={control}
                            name="elections"
                            render={({ field: { onChange, value } }) => (
                                <MultiSelect
                                    options={elections}
                                    value={value || multiselectPreselectedValues}
                                    onChange={onChange}
                                    labelledBy="Select"
                                    disableSearch
                                    hasSelectAll={false}
                                />
                            )}
                        />
                    </Form.Group>
                    <div className="current-elections">
                        <h5>Elecciones actuales</h5>
                        <Table striped bordered hover>
                            <tbody>
                                {elections && currentElections && currentElections.map(c => {
                                    return (<tr><td>{getElectionName(c.electionId)}</td></tr>)
                                })}
                            </tbody>
                        </Table>
                    </div>
                    <div className="pull-right">
                        <Link to={'/voters'} className="btn btn-danger btn-block">Cancelar</Link>
                        <Button className="btn btn-primary" type="submit">Guardar</Button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default VotersElections;