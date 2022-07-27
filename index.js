const express = require('express');
const { cp } = require('fs/promises');
const app = express();
 

app.use(express.json());

app.listen(3000, function () {
    console.log("Rodando na porta 3000")
}) 

/*{
    "id": "0939db71-c518-4c6c-bb48-e36347722db1",  // patient id 
    "name": "Matilde Fernandes Goncalves",         // patient name
    "healthInsuranceCardId": "123456789",          // health insurance card id
    "address": "Rua Luís de Castro, 1182",         // patient address
    "createdAt": "2022-05-05"                      // patient created date
  }
 */ 
let pacientes = []
let contadorId = 1

//Criar novo paciente (CREATE)

app.post("/pacientes", function (request, response) {
    const paciente = {
        id: contadorId++,
        name: "Gustavo",
        cardId: 123, 
        adress: "Rua 1",
        createdAt: new Date()
    }

    pacientes.push(paciente);
    response.json(pacientes).status(201);
});

// Listar Paciente (READ)

app.get("/pacientes", (request, response) => {
    response.json(pacientes).status(200);

})  

// Selecionar Paciente por ID (READ)

app.get("/pacientes/:id", (request, response) =>{
const {id} = request.params

const pacienteEncontrado = pacientes.some(paciente => paciente.id === parseInt(id));
    if (!pacienteEncontrado){
        return response.status(404).send("Paciente não Encontrado")
    }
const paciente = pacientes.filter(paciente => paciente.id === parseInt(id));

return response.status(200).json(paciente);
})

//Atualizar (UPDATE)

app.put("/pacientes/:id", (request, response) =>{
    const {name, cardId, adress} = request.body;

const {id} = request.params

const pacienteParaEditar = pacientes.some(paciente => paciente.id === parseInt(id));

    if(!pacienteParaEditar){
        return response.status(404).send("Paciente não encontrado!");
    }

    for (const paciente of pacientes){
        if(paciente.id === parseInt(id)){
           if(name) paciente.name = name;
           if(cardId) paciente.cardId = cardId;
           if(adress) paciente.adress = adress;
        }
    }

    response.status(200).send("Paciente atualizado com Sucesso");

})


// Deletar (Delete)

app.delete("/pacientes/:id", (request, response) =>{
    const id = request.params.id

const pacienteParaDeletar = pacientes.some(paciente => paciente.id === parseInt(id));

    if (!pacienteParaDeletar) {
        return response.status(404).send("Paciente não encontrado!");
    };


  const listaAtualizada = pacientes.filter(paciente => paciente.id !== parseInt(id));
  pacientes = listaAtualizada;

  response.status(200).send("Paciente Deletado com Sucesso")

})



