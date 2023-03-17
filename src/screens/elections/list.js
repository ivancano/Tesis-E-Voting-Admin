import React, { useState, useEffect } from "react";
import Moment from 'react-moment';
import {
    Link
} from "react-router-dom";
import Button from "react-bootstrap/Button";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import ElectionService from "../../services/elections";

const ElectionsList = () => {

    const [elections, setElections] = useState([])
    const [file, setFile] = useState();

    const { SearchBar } = Search;

    const hiddenFileInput = React.useRef(null);

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
        const formValues = new FormData();
        formValues.append('file', e.target.files[0]);
        ElectionService.createBatch(formValues)
        .then(data => {
            window.location.reload();
        })
    };

    const handleOnSubmit = (e) => {
        hiddenFileInput.current.click();
    };

    const goToActa = (id) => {
        window.open('http://localhost:8080/api/v1/elections/acta-escrutinio/'+id, '_blank');
    }

    const optionsPagination = {
        firstPageText: 'Primera',
        prePageText: 'Anterior',
        nextPageText: 'Siguiente',
        lastPageText: 'Última',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
              { to } de { size } resultados
            </span>
        ),
        disablePageTitle: true,
    };

    const columns = [
        {
            text: 'Nombre',
            dataField: 'name',
            sort: true,
        },
        {
            text: 'Fecha de Inicio',
            dataField: 'startTime',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => {
                return (<Moment format="DD/MM/YYYY HH:mm">{cell}</Moment>)
            }
        },
        {
            text: 'Fecha de Fin',
            dataField: 'endTime',
            sort: true,
            formatter: (cell, row, rowIndex, formatExtraData) => {
                return (<Moment format="DD/MM/YYYY HH:mm">{cell}</Moment>)
            }
        },
        {
            text: 'Estado',
            dataField: 'status',
            formatter: cell => {
                return cell ? 'Activo' : 'Inactivo'
            },
            sort: true
        },
        {
            dataField: 'actions',
            text: 'Acciones',
            formatter: (cell, row, rowIndex, formatExtraData) => {
                return (
                    <>
                        <Link to={'elections/show/' + row.id} className="btn btn-sm btn-secondary">
                            Ver
                        </Link>
                        <Link to={'elections/edit/' + row.id} className="btn btn-sm btn-primary">
                            Editar
                        </Link>
                        <Link to={'elections/details/' + row.id} className="btn btn-sm btn-secondary">
                            Candidatos
                        </Link>
                        <Link to={'elections/vote-counter/' + row.id} className="btn btn-sm btn-secondary">
                            Conteo de Votos
                        </Link>
                        <Button onClick={() => goToActa(row.id)} target="_blank" className="btn btn-sm btn-secondary">
                            Acta de Escrutinio
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => deleteRow(row.id)}>Eliminar</Button>
                    </>
                )
            }
        }
    ];

    useEffect(() => {
        ElectionService.getAll()
        .then(data => {
            setElections(data)
        })
    }, []);

    const deleteRow = (id) => {
        if(window.confirm('¿Está seguro que desea borrar este registro?')) {
            ElectionService.delete(id).then(() => {
                window.location.reload();
            });
        }
    }
    
    const columnLabels = ['Nombre', 'Fecha de Inicio', 'Fecha de Fin', 'Estado'];

    return (
        <>
            <h4>Elecciones</h4>
            <div className="table-wrapper">
                <Link to={'/elections/new'} className="btn btn-sm btn-primary pull-right">
                    Nueva Elección
                </Link>
                <div>
                    <form>
                        <input
                            type={"file"}
                            id={"csvFileInput"}
                            accept={".csv"}
                            onChange={handleOnChange}
                            ref={hiddenFileInput}
                            style={{display:'none'}} 
                        />
                        <Button
                            className="btn btn-sm btn-secondary pull-right"
                            onClick={(e) => {
                                handleOnSubmit(e);
                            }}
                        >
                            Carga masiva
                        </Button>
                    </form>
                </div>
                <ToolkitProvider
                    keyField="id"
                    columns={columns}
                    data={elections}
                    search
                >
                    {
                        props => (
                            <div>
                                <SearchBar 
                                    { ...props.searchProps }
                                    placeholder={"Buscar"}
                                    srText={""}
                                />
                                <hr />
                                <BootstrapTable
                                    { ...props.baseProps }
                                    pagination={ paginationFactory(optionsPagination) }
                                    striped
                                    hover
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        </>
    );
}

export default ElectionsList;