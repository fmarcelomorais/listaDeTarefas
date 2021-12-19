const $btnTarefas = document.getElementById('btnTarefas')
let db = firebase.firestore()

async function cadastrarTarefas(e){
    const $tarefas = document.getElementById('tarefas')
    e.preventDefault();

    let codigo = String($tarefas.value)
    let nomeDoc = codigo.split(' ').join('')
    try {
        db.collection('tarefas').doc(nomeDoc).set({
            Tarefa: $tarefas.value
        })
        console.log(codigo)
        document.getElementById('tarefas').value = ''
        
    } catch (error) {
        console.log(error)
    }
    
}
$btnTarefas.addEventListener('click', cadastrarTarefas)

async function listaDeTarefas(){    
    const $tarefa = document.getElementById("tarefa")
    const tarefas = await db.collection('tarefas')
    const listaDeTarefas = await tarefas.get()

    const lista = []
    listaDeTarefas.forEach((l) => lista.push(l))
    console.log(lista)
    lista.forEach(tarefa => {
        let $td = document.createElement('tr')
        let info = ''
       
        if(tarefa){
            info = `                  
            <td><input type="text" class="form-control" value="${tarefa.data().Tarefa}" id="tarefaEdit"></td>
            <td>
            <button class="btn btn-warning" id="btnEdit" onclick="editar(event)" value="${tarefa.id}">Editar</button>
            <button class="btn btn-danger">Excluir</button>
            </td>
            
            `
        }else{
            $tarefa.innerHTML = `
            <td>Todas as Tarefas Foram Realizadas</td>
            `
        }
        $tarefa.appendChild($td).innerHTML += info
    });
    document.getElementById('tarefaEdit').setAttribute('disabled', 'disabled')

}

async function editar(e){
    const $btnEdit = document.getElementById('btnEdit')
    e.preventDefault()
    const $tarefaEd = document.getElementById("tarefaEdit")
    $tarefaEd.value = await $btnEdit.value
    document.getElementById('tarefaEdit').removeAttribute('disabled')
    document.getElementById('btnEdit').setAttribute('class','btn btn-success')
    document.getElementById('btnEdit').setAttribute('onclick','salvar(event)')
    console.log($btnEdit)
    
    /* try {
        await db.collection('tarefas').doc($btnEdit).set({
            Tarefa: $tarefa.value
        })
        console.log(codigo)
        document.getElementById('tarefas').value = ''
        
    } catch (error) {
        console.log(error)
    }  */ 
    
}

async function salvar(e){
    const $btnEdit = document.getElementById('btnEdit')
    e.preventDefault()
    const $tarefaEd = document.getElementById("tarefaEdit")
    $tarefaEd.value = await $btnEdit.value
    document.getElementById('tarefaEdit').setAttribute('disabled', 'disabled')
    document.getElementById('btnEdit').setAttribute('class','btn btn-warning')
    document.getElementById('btnEdit').setAttribute('onclick','editar(event)')
    console.log($btnEdit)
    
    /* try {
        await db.collection('tarefas').doc($btnEdit).set({
            Tarefa: $tarefa.value
        })
        console.log(codigo)
        document.getElementById('tarefas').value = ''
        
    } catch (error) {
        console.log(error)
    }  */ 
    
}



