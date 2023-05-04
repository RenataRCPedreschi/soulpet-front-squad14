import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export function Agendamentos() {
    const [agendamentos, setAgendamentos] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3001/agendamentos`).then(resposta => {
            setAgendamentos(resposta.data)
        })
    }, [])

    return (
        <div className="agendamentos container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Agendamentos</h1>
                <Button as={Link} to="/agendamentos/novo">
                    <i className="bi bi-plus-lg me-2" /> Agendamento
                </Button>
            </div>

            {agendamentos === null ? <Loader /> :
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Data do Agendamento</th>

                            <th>Status</th>

                            <th>Serviço</th>

                            <th>Pet</th>

                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {agendamentos.map(agendamento => {
                            return (
                                <tr key={agendamento.id}>
                                    <td>{agendamento.dataAgendada}</td>

                                    <td>{agendamento.status}</td>

                                    <td>{agendamento.servicoId}</td>

                                    <td>{agendamento.petId}</td>

                                    <td className="d-flex gap-2">
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
                </Table>}
        </div>
    )
}