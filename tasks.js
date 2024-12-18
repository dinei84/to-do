export class TaskManager {
    static #tarefas = []
    static #ultimoId = 0

    static adicionar(titulo, descricao, prioridade, status) {
        this.#ultimoId++
        if (!titulo || !descricao || !prioridade || !status) {
            throw new Error("Por favor, preencha todos os campos")
        }
        
        const novaTarefa = {
            id: this.#ultimoId, 
            titulo, 
            descricao, 
            prioridade, 
            status
        }
        
        this.#tarefas.push(novaTarefa)
        return novaTarefa
    }

    static buscar(filtros = {}) {
        const chaves = Object.keys(filtros)
        if (chaves.length === 0) {
            return this.#tarefas
        }
        
        return this.#tarefas.filter(tarefa => 
            chaves.every(chave => tarefa[chave] === filtros[chave])
        )
    }

    static atualizar(id, novosDados) {
        const tarefa = this.#tarefas.find(tarefa => tarefa.id === id)
        if (!tarefa) {
            throw new Error("Tarefa não encontrada")
        }
        
        Object.assign(tarefa, novosDados)
        return tarefa
    }

    static deletar(id) {
        const indice = this.#tarefas.findIndex(tarefa => tarefa.id === id)
        
        if (indice === -1) {
            throw new Error("Id não encontrado")
        }
        
        const tarefaRemovida = this.#tarefas.splice(indice, 1)[0]
        return tarefaRemovida
    }

    static listarTodas() {
        return [...this.#tarefas]
    }
}