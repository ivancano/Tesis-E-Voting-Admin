import React from "react";
import {
    Link
} from "react-router-dom";

const ShowForm = (props) => {

    return (
        <div className="form-wrapper">
            {
                props.fields && props.fields.map(f => (
                    <p><strong>{f.label}:</strong> {f.value}</p>
                ))
            }
            <div className="pull-right">
                <Link to={props.cancelLink} className="btn btn-danger btn-block">Cancelar</Link>
            </div>
        </div>
    );
}

export default ShowForm