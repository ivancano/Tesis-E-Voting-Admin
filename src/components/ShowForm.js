import React from "react";
import Moment from 'react-moment';
import {
    Link
} from "react-router-dom";

const ShowForm = (props) => {

    return (
        <div className="form-wrapper">
            {
                props.fields && props.fields.map(f => {
                    if(f.type == 'text') {
                        return (
                            <p><strong>{f.label}:</strong> {f.value}</p>
                        )
                    }
                    if(f.type == 'boolean') {
                        return (
                            <p><strong>{f.label}:</strong> {f.value ? 'Activo' : 'Inactivo'}</p>
                        )
                    }
                    if(f.type == 'date') {
                        return (
                            <p><strong>{f.label}:</strong> <Moment format="DD/MM/YYYY HH:mm">{f.value}</Moment></p>
                        )
                    }
                })
            }
            <div className="pull-right">
                <Link to={props.cancelLink} className="btn btn-danger btn-block">Cancelar</Link>
            </div>
        </div>
    );
}

export default ShowForm