var express = require('express');
var router = express.Router();
const sql = require ('../models/colheita.model')

/* GET users listing. */
router.get('/colheita', function(req, res, next) {
 sql.getColheita().then((resposta)=>{
  if (resposta instanceof Error){
    res.status(500).send(resposta);
    return;
  }
  res.status(200).json(resposta);
 })
});

router.get('/colheita/:id', function(req, res, next) {
  sql.getColheitaById(req.params.id).then((resposta)=>{
   if (resposta instanceof Error){
     res.status(500).send(resposta);
     return;
   }
   res.status(200).json(resposta);
  })
 });
 
 //Insere um usuário no banco de dados
router.post('/colheita',function(req,res){
let info = req.body;
sql.addColheita(
  info.quantidade,
  info.dt_colheita,
  info.arvore_id
  
).then((resposta)=>{
    if(resposta instanceof Error){
      res.status(500).json(resposta);
      return;
    }
    res.status(201).json(resposta);

  })
})
//Tentativa de login

//Adiciona o usuário
router.post('/add',(req,res)=>{
//Guarda as informações em uma variavel para
//facilitar o acesso
let dados = req.body.info;

  sql.addColheita(
   dados.quantidade,
   dados.dt_colheita,
   dados.arvore_id,
   '123Mudar!'
  ).then((resposta)=>{
    if(resposta instanceof Error){
      res.status(500).json(resposta);
      return;
    }
    res.status(201).json(resposta);     
  })
})

//Rota para buscar todos os usuários
router.get('/buscaTodos',(req,res)=>{
 sql.buscaTodosColheita().then((resposta)=>{
  if (resposta instanceof Error){
    res.status(500).json(resposta);
    return;
  }
  res.status(200).json(resposta);
 })
})


module.exports = router;
