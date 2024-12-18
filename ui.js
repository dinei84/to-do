import { TaskManager } from './tasks.js';

export class TaskUI {
    static inicializar() {
        this.formTarefa = document.getElementById('formTarefa');
        this.tabelaTarefas = document.getElementById('tabelaTarefas');
        this.formFiltro = document.getElementById('formFiltro');

        this.setupEventListeners();
        this.renderizarTarefas();
    }

    static setupEventListeners() {
        // Evento de adicionar tarefa
        this.formTarefa.addEventListener('submit', (e) => {
            e.preventDefault();
            this.adicionarTarefa();
        });

        // Evento de filtrar tarefas
        this.formFiltro.addEventListener('submit', (e) => {
            e.preventDefault();
            this.filtrarTarefas();
        });

        // Delegação de eventos para editar e deletar
        this.tabelaTarefas.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-editar')) {
                this.prepararEdicao(e.target.closest('tr'));
            }
            if (e.target.classList.contains('btn-deletar')) {
                this.deletarTarefa(e.target.closest('tr'));
            }
        });
    }

    static adicionarTarefa() {
        const titulo = document.getElementById('titulo').value;
        const descricao = document.getElementById('descricao').value;
        const prioridade = document.getElementById('prioridade').value;
        const status = document.getElementById('status').value;

        try {
            TaskManager.adicionar(titulo, descricao, prioridade, status);
            this.renderizarTarefas();
            this.formTarefa.reset();
        } catch (erro) {
            alert(erro.message);
        }
    }

    static renderizarTarefas(tarefasFiltradas = null) {
        const tarefas = tarefasFiltradas || TaskManager.listarTodas();
        const corpoTabela = this.tabelaTarefas.querySelector('tbody');
        corpoTabela.innerHTML = '';

        tarefas.forEach(tarefa => {
            const linha = document.createElement('tr');
            linha.dataset.id = tarefa.id;
            linha.innerHTML = `
                <td>${tarefa.id}</td>
                <td>${tarefa.titulo}</td>
                <td>${tarefa.descricao}</td>
                <td>${tarefa.prioridade}</td>
                <td>${tarefa.status}</td>
                <td>
                    <button class="btn-editar">Editar</button>
                    <button class="btn-deletar">Deletar</button>
                </td>
            `;
            corpoTabela.appendChild(linha);
        });
    }

    static filtrarTarefas() {
        const filtros = {};
        const camposFiltro = this.formFiltro.elements;

        ['prioridade', 'status'].forEach(campo => {
            const valor = camposFiltro[campo].value;
            if (valor) filtros[campo] = valor;
        });

        const tarefasFiltradas = TaskManager.buscar(filtros);
        this.renderizarTarefas(tarefasFiltradas);
    }

    static prepararEdicao(linha) {
        const id = parseInt(linha.dataset.id);
        const campos = linha.querySelectorAll('td');
        
        // Substituir células por inputs
        campos[1].innerHTML = `<input type="text" value="${campos[1].textContent}">`;
        campos[2].innerHTML = `<input type="text" value="${campos[2].textContent}">`;
        campos[3].innerHTML = `<select>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
        </select>`;
        campos[4].innerHTML = `<select>
            <option value="Pendente">Pendente</option>
            <option value="Em Progresso">Em Progresso</option>
            <option value="Concluída">Concluída</option>
        </select>`;

        // Definir valores atuais
        campos[3].querySelector('select').value = campos[3].textContent;
        campos[4].querySelector('select').value = campos[4].textContent;

        // Substituir botões
        linha.querySelector('td:last-child').innerHTML = `
            <button class="btn-salvar">Salvar</button>
            <button class="btn-cancelar">Cancelar</button>
        `;

        // Adicionar evento de salvar
        linha.querySelector('.btn-salvar').addEventListener('click', () => {
            const novoTitulo = campos[1].querySelector('input').value;
            const novaDescricao = campos[2].querySelector('input').value;
            const novaPrioridade = campos[3].querySelector('select').value;
            const novoStatus = campos[4].querySelector('select').value;

            try {
                TaskManager.atualizar(id, {
                    titulo: novoTitulo,
                    descricao: novaDescricao,
                    prioridade: novaPrioridade,
                    status: novoStatus
                });
                this.renderizarTarefas();
            } catch (erro) {
                alert(erro.message);
            }
        });

        // Adicionar evento de cancelar
        linha.querySelector('.btn-cancelar').addEventListener('click', () => {
            this.renderizarTarefas();
        });
    }

    static deletarTarefa(linha) {
        const id = parseInt(linha.dataset.id);
        
        if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
            try {
                TaskManager.deletar(id);
                this.renderizarTarefas();
            } catch (erro) {
                alert(erro.message);
            }
        }
    }
}