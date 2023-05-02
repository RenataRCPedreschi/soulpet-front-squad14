import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";


export function Servicos() {

    const [servicos, setServicos] = useState(null);

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/servicos")
            .then(response => {
                setServicos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

   

    return (
        <div className="servicos container">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="mb-3">Servicos</h1>
                <Button as={Link} to="/servicos/novo">
                    <i className="bi bi-plus-lg me-2"></i> Serviços
                </Button>
            </div>
            {
                servicos === null ?
                    <Loader />
                    :
                    <div className="row justify-content-start">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Serviço</th>
                                <th>Preço</th>
                                <th className="d-flex gap-2 justify-content-center" >Ações</th>          
                            </tr>
                        </thead>
                        <tbody>
                            {servicos.map(servico => {
                                return (
                                    <tr key={servico.id}>
                                        <td>{servico.nome}</td>
                                        <td>R$ {servico.preco}</td>
                                        <td className="d-flex gap-2 justify-content-center">
                                            <Button>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    </div>
            }
        </div>
    );
}