// to-do list

const tarefas = []
let ultimoId = 0

function adicionarTarefas(id, titulo, descricao, prioridade, status){
    ultimoId++
    if(!ultimoId || !titulo || !descricao || !prioridade || !status){
        return "Por favor, preencha todos os campos"
    }else{
        tarefas.push({id, titulo, descricao, prioridade, status})
        return tarefas
    }    
}

function buscarTarefas(filtros){
    const chaves = Object.keys(filtros)
    if(!filtros || chaves.length == 0){
        console.log("Por favor preencha os campos");
        return tarefas
    }else{
        return tarefas.filter(tarefa => {
            return chaves.every(chave => {
                return tarefa[chave] === filtros[chave]
            })
        })
    }            
}

function atualizarTarefas(id, novoStatus){
    
}


console.log(adicionarTarefas(ultimoId, 'Estudar', 'Estudar para a prova de matemática', 'Alta', 'A fazer'))
console.log(adicionarTarefas(ultimoId, 'Ler', 'ler prova de matemática', 'Baixa', 'Fazendo'))
console.log(adicionarTarefas(ultimoId, 'Cozinhar', 'Cozinhar frango', 'Media', 'A fazer'))


console.log(buscarTarefas({status: 'A fazer'}))