import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export function Produtos() {

    const [produtos, setProdutos] = useState(null);
    const [show, setShow] = useState(false);
    const [idProdutos, setIdProdutos] = useState(null);
    
    const handleClose = () => {
        setIdProdutos(null);
        setShow(false)
    };
    const handleShow = (id) => {
        setIdProdutos(id);
        setShow(true)
    };

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/produtos")
            .then(response => {
                setProdutos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function onDelete() {
        axios.delete(`http://localhost:3001/produtos/${idProdutos}`)
            .then(response => {
                toast.success(response.data.message, { position: "bottom-right", duration: 2000 });
                initializeTable();
            })
            .catch(error => {
                console.log(error);
                toast.error(error.response.data.message, { position: "bottom-right", duration: 2000 });
            });
        handleClose();
    }

    return (
        <div className="produtos container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Produtos</h1>
                <Button as={Link} to="/produtos/novo">
                    <i className="bi bi-plus-lg me-2"></i> Produtos
                </Button>
            </div>
            {
                produtos === null ?
                    <Loader />
                    :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Descrição</th>
                                <th>Desconto</th>
                                <th>Data do Desconto</th>
                                <th>Categoria</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map(produtos => {
                                return (
                                    <tr key={produtos.id}>
                                        <td>{produtos.nome}</td>
                                        <td>{produtos.preco}</td>
                                        <td>{produtos.descricao}</td>
                                        <td>{produtos.desconto}</td>
                                        <td>{produtos.dataDesconto}</td>
                                        <td>{produtos.categoria}</td>
                                        <td className="d-flex gap-2">
                                            <Button onClick={() => handleShow(produtos.id)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button as={Link} to={`/produtos/editar/${produtos.id}`}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir o produto?</Modal.Body>
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
    );
}