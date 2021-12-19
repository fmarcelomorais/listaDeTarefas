(function(){
  const firebaseConfig = {
    apiKey: "AIzaSyDxwaXX61MDSiZa3w437lqtbFH-Cf5fleA",
    authDomain: "listatarefas-88331.firebaseapp.com",
    databaseURL: "https://listatarefas-88331-default-rtdb.firebaseio.com",
    projectId: "listatarefas-88331",
    storageBucket: "listatarefas-88331.appspot.com",
    messagingSenderId: "608194300494",
    appId: "1:608194300494:web:3ea781f3eb9143176ed11f"
  }; 
  
  firebase.initializeApp(firebaseConfig);
})()

let database = firebase.database() // conexão com o Real Time database
 

/* Funcões do programa */


const $btnSalvar = document.getElementById('btnTarefas')

function salvar(e){ // função salva tarefa no banco
  e.preventDefault();

    let $tarefa = document.getElementById("tarefas").value  
    let $descricao = document.getElementById("descricao").value  
    
    const id = parseInt(Math.random() * (1, 10000))    

    //console.log(id)
    let tarefa = {
      id: id,
      tarefa: $tarefa,
      descricao: $descricao
    }
 
    database.ref('tarefas/'+id).set(tarefa)

    alert('Salvo com Sucesso') 
   // console.log(tarefa)
    $tarefa.value = ''  
    $descricao.value = ''  
    
  }

  function listaDeTarefas(){  // função lista tarefas no HTML
    
    let tarefas = database.ref('tarefas/')
    tarefas.on('child_added', (dados)=>{
       let tarefas = dados.val()
       html(tarefas)
      })
  }
  
  function html(tarefas){ // Monta o HTML
    let $tarefa = document.getElementById('tarefa')
    
    if(tarefas){
      render = `
         <td>${tarefas.tarefa} </td>
         <td>${tarefas.descricao} </td>
         <td><button class="btn btn-danger" type="button" onclick="deletar(${tarefas.id})" id="alterar">Excluir</td>
         `
         //console.log(tarefas.id)
       
       $tarefa.innerHTML += render      
    }else{      
      $tarefa.innerHTML = `
      <td>Todas as Tarefas Foram Concluidas</td>`
    }

  }

  function deletar(id){
    document.getElementById('tarefa').innerHTML = ''
    database.ref('tarefas/'+id).remove()
    //tarefa.remove()
    listaDeTarefas()
  }
  $btnSalvar.addEventListener('click', salvar)
  //salvar('cortar cabelo')