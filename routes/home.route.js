var express = require('express');
var router = express.Router();
const sql = require('../models/home.model');

  router.get('/buscaTodos',(req,res)=>{
    sql.buscaTodosHome().then((resposta)=>{
      if(resposta instanceof Error){
        res.status(500).json(resposta);
        return;
      }
      res.status(200).json(resposta);
    })
})





module.exports = router;