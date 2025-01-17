import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";


export function NovoPet() {
    const [clientes, setClientes] = useState([]);
    const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/clientes")
        .then(response => {
        setClientes(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    function onSubmit(data) {

    axios
    .post("http://localhost:3001/pets", data)
    .then((response) => {
        toast.success("Pet adicionado com sucesso!", {
        position: "bottom-right",
        duration: 2500,
        });
        navigate("/pets");
    })
    .catch((error) => {
        toast.error("Não foi possível adicionar um novo Pet.", {
        position: "bottom-left",
        duration: 3000,
        });
        console.log(error);
        
    });
}

return (
    <div className="container-form">
        <h1>Adicionar Novo Pet</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
                type="text"
                className={errors.nome && "is-invalid"}
                {...register("nome", {
                required: "O nome do Pet é obrigatório.",
                maxLength: {
                    value: 130,
                    message: "Limite de 130 caracteres.",
                },
                })}
            />
            {errors.nome && (
                <Form.Text className="invalid-feedback">
                {errors.nome?.message}
                </Form.Text>
            )}
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
                type="text"
                className={errors.tipo && "is-invalid"}
                {...register("tipo", {
                required: "É  obrigatório declarar o tipo do Pet.",
                maxLength: {
                    value: 100,
                    message: "Limite de 100 caracteres.",
                },
                })}
            />
            {errors.tipo && (
                <Form.Text className="invalid-feedback">
                {errors.tipo?.message}
                </Form.Text>
            )}
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Porte</Form.Label>
            <Form.Control
                type="text"
                className={errors.porte && "is-invalid"}
                {...register("porte", {
                required: "O porte do Pet é obrigatório.",
                maxLength: {
                    value: 100,
                    message: "Limite de 100 caracteres.",
                },
                })}
            />
            {errors.porte && (
                <Form.Text className="invalid-feedback">
                {errors.porte?.message}
                </Form.Text>
            )}
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control
                type="date"
                className={errors.dataNasc && "is-invalid"}
                {...register("dataNasc", {
                required: "O data de Nascimento do Pet é obrigatória.",
                maxLength: {
                    value: 100,
                    message: "Limite de 100 caracteres.",
                },
                })}
            />
            {errors.dataNasc && (
                <Form.Text className="invalid-feedback">
                {errors.dataNasc?.message}
                </Form.Text>
            )}
            </Form.Group>
            <Form.Group className="mb-3">
                        <Form.Label>Tutor</Form.Label>
                        <Form.Select className={errors.clienteId && "is-invalid"} {...register("clienteId", { required: "Tutor é obrigatório!" })}>
                            {clientes.map(cliente => <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>)}
                        </Form.Select>
                        <Form.Text className="invalid-feedback">
                            {errors.clienteId?.message}
                        </Form.Text>
                    </Form.Group>

            
            <Button variant="success" type="submit">
                Cadastrar
            </Button>
        
        </Form>
    
    </div>
);
}