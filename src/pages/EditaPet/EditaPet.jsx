import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function EditaPet() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const [clientes, setClientes] = useState([])

    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3001/clientes").then(resposta => {
            console.log(resposta)
            setClientes(resposta.data)
        })
        axios.get(`http://localhost:3001/pets/${id}`).then(resposta => {
            const { nome, tipo, porte, dataNasc, clienteId } = resposta.data
            reset({ nome, tipo, porte, dataNasc, clienteId })
        })
    }, [reset, id])

    const clicarNoBotaoAtualizar = (dadosDoFormulario) => {
        axios.put(`http://localhost:3001/pets/${id}`, dadosDoFormulario).then(resposta => {
            console.log(resposta)
            toast.success(resposta.data.message, {
                position: "bottom-right",
                duration: 2500
            })
            navigate("/pets")
        }).catch(erro => {
            console.log(erro)
            toast.error("Um erro aconteceu.", {
                position: "bottom-right",
                duration: 2500
            })
        })
    }

    return (
        <div className="container">
            <h1>Editar Informações do Pet</h1>

            <Form onSubmit={handleSubmit(clicarNoBotaoAtualizar)}>
                <Form.Group>
                    <Form.Label>
                        Nome
                    </Form.Label>

                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres." } })} />

                    <Form.Text>
                        {errors.nome?.message}
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Tipo
                    </Form.Label>

                    <Form.Control type="text" className={errors.tipo && "is-invalid"} {...register("tipo", { required: "O tipo é obrigatório.", maxLength: { value: 100, message: "Limite de 100 caracteres." } })} />

                    <Form.Text>
                        {errors.tipo?.message}
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Porte
                    </Form.Label>

                    <Form.Control type="text" className={errors.porte && "is-invalid"} {...register("porte", { required: "O porte é obrigatório.", maxLength: { value: 100, message: "Limite de 100 caracteres." } })} />

                    <Form.Text>
                        {errors.porte?.message}
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Data de Nascimento
                    </Form.Label>

                    <Form.Control type="date" className={errors.dataNasc && "is-invalid"} {...register("dataNasc", { required: "A data de nascimento é obrigatória." })} />

                    <Form.Text>
                        {errors.dataNasc?.message}
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Tutor
                    </Form.Label>

                    <Form.Select className={errors.clienteId && "is-invalid"} {...register("clienteId", { required: "O tutor é obrigatório." })}>
                        {clientes.map(cliente => <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>)}
                    </Form.Select>

                    <Form.Text>
                        {errors.clienteId?.message}
                    </Form.Text>
                </Form.Group>

                <Button type="submit" variant="success">
                    Atualizar
                </Button>
            </Form>
        </div>
    )
}