import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export function Servicos() {
  const [servicos, setServicos] = useState(null);
  const [show, setShow] = useState(false);
  const [idServico, setIdServico] = useState(null);

  const handleClose = () => {
    setIdServico(null);
    setShow(false);
  };

  const handleShow = (id) => {
    setIdServico(id);
    setShow(true);
  };

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get("http://localhost:3001/servicos")
      .then((response) => {
        setServicos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onDelete() {
    axios
      .delete(`http://localhost:3001/servicos/${idServico}`)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        initializeTable();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });
    handleClose();
  }

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
      {servicos === null ? (
        <Loader />
      ) : (
        <div className="row justify-content-start">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Preço</th>
                <th className="d-flex gap-2 justify-content-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {servicos.map((servico) => {
                return (
                  <tr key={servico.id}>
                    <td>{servico.nome}</td>
                    <td>R$ {servico.preco}</td>
                    <td className="d-flex gap-2 justify-content-center">
                      <Button variant="danger" onClick={() => handleShow(servico.id)}>
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                      <Button>
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmação</Modal.Title>
            </Modal.Header>
            <Modal.Body>Tem certeza que deseja excluir o cliente?</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={onDelete}>
                Excluir
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}