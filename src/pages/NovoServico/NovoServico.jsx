import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export function NovoServico() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    axios
      .post("http://localhost:3001/servicos", data)
      .then((response) => {
        toast.success("Serviço adicionado.", {
          position: "bottom-right",
          duration: 2000,
        });
      })
      .catch((error) => {
        toast.error("Algo deu errado.", {
          position: "bottom-right",
          duration: 2000,
        });
        console.log(error);
      });
  }

  return (
    <div className="container">
      <h1>Novo Serviço</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            className={errors.nome && "is-invalid"}
            {...register("nome", {
              required: "O nome é obrigatório.",
              maxLength: { value: 130, message: "Limite de 130 caracteres." },
            })}
          />
          {errors.nome && (
            <Form.Text className="invalid-feedback">
              {errors.nome?.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Preco</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            className={errors.preco && "is-invalid"}
            {...register("preco", { required: "O preço é obrigatório." })}
          />
          {errors.preco && (
            <Form.Text className="invalid-feedback">
              {errors.preco?.message}
            </Form.Text>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </div>
  );
}
