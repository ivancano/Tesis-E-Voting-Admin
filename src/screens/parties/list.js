import React, { useState, useEffect } from "react";
import {
    Link
} from "react-router-dom";
import Button from "react-bootstrap/Button";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import PartyService from "../../services/parties";

const PartiesList = () => {

    const [parties, setParties] = useState([])
    const [file, setFile] = useState();

    const { SearchBar } = Search;

    const hiddenFileInput = React.useRef(null);

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
        const formValues = new FormData();
        formValues.append('file', e.target.files[0]);
        PartyService.createBatch(formValues)
        .then(data => {
            window.location.reload();
        })
    };

    const handleOnSubmit = (e) => {
        hiddenFileInput.current.click();
    };

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
                        <Link to={'parties/show/' + row.id} className="btn btn-sm btn-secondary">
                            Ver
                        </Link>
                        <Link to={'parties/edit/' + row.id} className="btn btn-sm btn-primary">
                            Editar
                        </Link>
                        <Button size="sm" variant="danger" onClick={() => deleteRow(row.id)}>Eliminar</Button>
                    </>
                )
            }
        }
    ];

    useEffect(() => {
        PartyService.getAll()
        .then(data => {
            setParties(data)
        })
    }, []);

    const deleteRow = (id) => {
        if(window.confirm('¿Está seguro que desea borrar este registro?')) {
            PartyService.delete(id);
            window.location.reload();
        }
    }

    return (
        <>
            <h4>Partidos Políticos</h4>
            <div className="table-wrapper">
                <Link to={'/parties/new'} className="btn btn-sm btn-primary pull-right">
                    Nuevo Partido Político
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
                    data={parties}
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

export default PartiesList;