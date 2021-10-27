import React from "react";
import {
    Link
} from "react-router-dom";

const ShowForm = (props) => {

    return (
        <div className="form-wrapper">
            {
                props.fields && props.fields.map(f => (
                    <p>{f.label}: {f.value}</p>
                ))
            }
            <div className="pull-right">
                <Link to={props.cancelLink} className="btn btn-danger btn-block">Cancel</Link>
            </div>
        </div>
    );
}

export default ShowForm