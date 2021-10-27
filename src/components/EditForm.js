import React from "react";
import {
    Link
} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EditForm = (props) => {

    return (
        <div className="form-wrapper">
            <Form onSubmit={props.onSubmit}>
                {
                    props.fields && props.fields.map(f => (
                        <Form.Group className="mb-3">
                            <Form.Label>{f.label}</Form.Label>
                            <Form.Control type={f.type} value={f.value} />
                        </Form.Group>
                    ))
                }
                <div className="pull-right">
                    <Link to={props.cancelLink} className="btn btn-danger btn-block">Cancel</Link>
                    <Button className="btn btn-primary" type="submit">Save</Button>
                </div>
            </Form>
        </div>
    );
}

export default EditForm