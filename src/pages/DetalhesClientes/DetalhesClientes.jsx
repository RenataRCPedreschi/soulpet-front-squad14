import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export function DetalhesClientes() {
  const [clientes, setClientes] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        axios
            .get(`http://localhost:3001/clientes/${id}`)
            .then((response) => {
                setClientes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

  return (
    <div className="clientes container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Detalhes do Cliente</h1>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Voltar</th>
          </tr>
        </thead>
        <tbody>
          {clientes ? (
            <tr key={clientes.id}>
              <td>{clientes.id}</td>
              <td>{clientes.nome}</td>
              <td>{clientes.email}</td>
              <td>{clientes.telefone}</td>
              <td className="d-flex gap-2">
                <Button as={Link} to="/clientes">
                  <i className="bi bi-arrow-counterclockwise"></i>
                </Button>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan="4">Nenhum cliente encontrado</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default DetalhesClientes;
