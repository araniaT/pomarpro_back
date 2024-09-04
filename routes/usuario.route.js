var express = require('express');
var router = express.Router();
const sql = require ('../models/usuario.model')

/* GET users listing. */
router.get('/usuarios', function(req, res, next) {
 sql.getUsuarios().then((resposta)=>{
  if (resposta instanceof Error){
    res.status(500).send(resposta);
    return;
  }
  res.status(200).json(resposta);
 })
});

router.get('/usuario/:id', function(req, res, next) {
  sql.getUsuarioById(req.params.id).then((resposta)=>{
   if (resposta instanceof Error){
     res.status(500).send(resposta);
     return;
   }
   res.status(200).json(resposta);
  })
 });
 
 //Insere um usuário no banco de dados
router.post('/usuario',function(req,res){
let info = req.body;
sql.addUsuario(
  info.nome,
  info.sobrenome,
  info.endereco,
  info.telefone,
  info.email,
  info.login,
  info.senha
).then((resposta)=>{
    if(resposta instanceof Error){
      res.status(500).json(resposta);
      return;
    }
    res.status(201).json(resposta);

  })
})
//Tentativa de login
router.post('/autenticar', function(req,res){
  sql.autenticaUsuario(
    req.body.usuario,
    req.body.senha).then((resposta)=>{
      if (resposta instanceof Error){
        res.status(500).json(resposta)
        return;
      }
      if(resposta.length == 0){
        res.status(401).json({mensagem:"Não autenticado"})
        return;
      }
      res.status(200).json(resposta);
    })
})

//Adiciona o usuário
router.post('/add',(req,res)=>{
//Guarda as informações em uma variavel para
//facilitar o acesso
let dados = req.body.info;

  sql.addUsuario(
   dados.nome,
   dados.sobrenome,
   dados.endereco,
   dados.telefone,
   dados.email,
   dados.login, 
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
 sql.buscaTodosUsuarios().then((resposta)=>{
  if (resposta instanceof Error){
    res.status(500).json(resposta);
    return;
  }
  res.status(200).json(resposta);
 })
})


module.exports = router;
