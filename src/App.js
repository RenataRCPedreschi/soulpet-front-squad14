import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { NovoCliente } from "./pages/NovoCliente/NovoCliente";
import { Clientes } from "./pages/Clientes/Clientes";
import { EditaCliente } from "./pages/EditaCliente/EditaCliente";
import { NovoPet } from "./pages/NovoPet/NovoPet";
import { NovoServico } from "./pages/NovoServico/NovoServico";
import { Pets } from "./pages/Pets/Pets"
import { Servicos } from "./pages/Servicos/Servicos";
import { NovoProduto } from "./pages/NovoProduto/NovoProduto";
import { NovoAgendamento } from "./pages/NovoAgendamento/NovoAgendamento";
import { EditaPet } from "./pages/EditaPet/EditaPet";
import { Produtos } from "./pages/Produtos/Produtos";
import { NovoPedido } from "./pages/NovoPedido/NovoPedido";
import { EditaServico } from "./pages/Editaservico/EditaServico";
import { DetalhesClientes } from "./pages/DetalhesClientes/DetalhesClientes";
import { Agendamentos } from "./pages/Agendamentos/Agendamentos";
import { DashBoard } from "./pages/DashBoard/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/novo" element={<NovoCliente />} />
          <Route path="/clientes/editar/:id" element={<EditaCliente />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/novo" element={<NovoPet />} />
          <Route path="/pets/editar/:id" element={<EditaPet />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/servicos/novo" element={<NovoServico />} />
          <Route path="/servicos/editar/:id" element={<EditaServico />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/novo" element={<NovoProduto />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/agendamentos/novo" element={<NovoAgendamento />} />
          <Route path="/pedidos/novo" element={<NovoPedido />} />
          <Route path="/clientes/detalhes/:id" element={<DetalhesClientes />} />
          <Route path="/dashboard" element={<DashBoard />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
