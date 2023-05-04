import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export function NovoPedido() {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [produtosAdicionados] = useState([]);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      produtos: produtosAdicionados,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "produtos",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/clientes")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/produtos")
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function onSubmit(data) {
    axios
      .post("http://localhost:3001/pedidos", data)
      .then((response) => {
        toast.success("Pedido adicionado com sucesso!", {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/pedidos");
      })
      .catch((error) => {
        toast.error("Não foi possível adicionar o pedido.", {
          position: "bottom-left",
          duration: 3000,
        });
        console.log(error);
      });
  }

  return (
    <div className="container">
      <h1>Novo Pedido</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Cliente</Form.Label>
          <Form.Select
            className={errors.clienteId && "is-invalid"}
            {...register("clienteId", { required: "Cliente é obrigatório!" })}
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </Form.Select>
          <Form.Text className="invalid-feedback">
            {errors.clienteId?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Produto</Form.Label>
          <Form.Select
            className={errors.produtoId && "is-invalid"}
            {...register("produtoId", { required: "Produto é obrigatório!" })}
          >
            <option value="">Selecione um produto</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="quantidade">
          <Form.Label>Quantidade</Form.Label>
          <Form.Control
            type="number"
            placeholder="Insira a quantidade"
            className={errors.quantidade && "is-invalid"}
            {...register("quantidade", {
              required: "Quantidade é obrigatória!",
            })}
          />
          <Form.Text className="invalid-feedback">
            {errors.quantidade?.message}
          </Form.Text>
        </Form.Group>

            {/* Adicionar mais produtos */}
        <Form onSubmit={handleSubmit((data) => console.log(data))}>
          {fields.map((field, index) => (
            <Form.Group className="mb-3" produtoId={`items[${index}].name`}>
              <Form.Label>Produtos</Form.Label>
              <Form.Select {...register(`items.${index}.name`)} defaultValue="">
                <option value="">Escolha um produto...</option>
                {produtos.map((produto) => (
                  <option value={produto.id}>{produto.nome}</option>
                ))}
              </Form.Select>

              <Form.Group className="mb-3" controlId="quantidade">
                <Form.Label>Quantidade</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Insira a quantidade"
                  className={errors.quantidade && "is-invalid"}
                  {...register("quantidade", {
                    required: "Quantidade é obrigatória!",
                  })}
                />
                <Form.Text className="invalid-feedback">
                  {errors.quantidade?.message}
                </Form.Text>
              </Form.Group>

              <br></br>
              <Button variant="danger" onClick={() => remove(index)}>
                Remover produto
              </Button>
            </Form.Group>
          ))}
          <div className="mb-3">
            <Button variant="primary" onClick={() => append({ name: "" })}>
              Adicionar novo produto a lista
            </Button>
          </div>
        </Form>

        <Button type="submit" className="btn btn-primary">
          Cadastrar pedido
        </Button>
      </Form>
    </div>
  );
}
