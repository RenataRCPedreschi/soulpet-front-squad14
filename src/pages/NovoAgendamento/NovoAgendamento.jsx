import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export function NovoAgendamento() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const [pets, setPets] = useState(null)
    const [servicos, setServicos] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3001/pets").then(resposta => {
            console.log(resposta)
            setPets(resposta.data)
        })
        axios.get("http://localhost:3001/servicos").then(resposta => {
            console.log(resposta)
            setServicos(resposta.data)
        })
    }, [])

    const clicarNoBotaoAgendar = (dadosDoFormulario) => {
        axios.post("http://localhost:3001/agendamentos", dadosDoFormulario).then(resposta => {
            toast.success("Agendamento realizado com sucesso", {
                position: "bottom-right",
                duration: 2500
            })
            navigate("/agendamentos")
        }).catch(erro => {
            console.error(erro)
            toast.error("Um erro aconteceu.", {
                position: "bottom-right",
                duration: 2500
            })
        })
    }

    if (pets === null && servicos === null || pets === null && servicos !== null || pets !== null && servicos === null) {
        return <Loader />
    } else {
        return (
            <div className="container">
                <h1>Adicionar Agendamento</h1>

                <Form onSubmit={handleSubmit(clicarNoBotaoAgendar)}>
                    <Form.Group>
                        <Form.Label>
                            Data do Agendamento
                        </Form.Label>

                        <Form.Control type="date" className={errors.dataAgendada && "is-invalid"} {...register("dataAgendada", { required: "A data de agendamento é obrigatória" })} />

                        <Form.Text className="invalid-feedback">
                            {errors.dataAgendada?.message}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="hidden" value={"Pendente"} {...register("status")} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Pet
                        </Form.Label>

                        <Form.Select className={errors.petId && "is-invalid"} {...register("petId", { required: "O pet é obrigatório" })}>
                            {pets.map(pet => <option key={pet.id} value={pet.id}>{pet.nome}</option>)}
                        </Form.Select>

                        <Form.Text className="invalid-feedback">
                            {errors.petId?.message}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Serviço
                        </Form.Label>

                        <Form.Select className={errors.servicoId && "is-invalid"} {...register("servicoId", { required: "O serviço é obrigatório" })}>
                            {servicos.map(servico => <option key={servico.id} value={servico.id}>{servico.nome}</option>)}
                        </Form.Select>

                        <Form.Text className="invalid-feedback">
                            {errors.servicoId?.message}
                        </Form.Text>
                    </Form.Group>

                    <Button type="submit" variant="success">Agendar</Button>
                </Form>
            </div>
        )
    }
}