var express = require('express');
var router = express.Router();
const sql = require ('../models/arvores.model')

/* GET users listing. */
router.get('/arvores', function(req, res, next) {
 sql.getArvores().then((resposta)=>{
  if (resposta instanceof Error){
    res.status(500).send(resposta);
    return;
  }
  res.status(200).json(resposta);
 })
});

router.get('/arvores/:id', function(req, res, next) {
  sql.getArvoresById(req.params.id).then((resposta)=>{
   if (resposta instanceof Error){
     res.status(500).send(resposta);
     return;
   }
   res.status(200).json(resposta);
  })
 });
 
 //Insere um usuário no banco de dados
router.post('/arvores',function(req,res){
let info = req.body;
sql.addCadastro(
  info.defensivo,
  info.fertilizante,
  info.ultima_verifacao,
  info.coluna,
  info.linha,
  info.tipo,
  info.situacao,
  info.pomar
  
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

  sql.addArvores(
   dados.defensivo,
   dados.fertilizante,
   dados.ultima_verifacao,
   dados.coluna,
   dados.linha,
   dados.tipo,
   dados.situacao,
   dados.pomar,
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
 sql.buscaTodosArvores().then((resposta)=>{
  if (resposta instanceof Error){
    res.status(500).json(resposta);
    return;
  }
  res.status(200).json(resposta);
 })
})


module.exports = router;
