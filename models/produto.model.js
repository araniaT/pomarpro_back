const conexao = require('../database/connection.database');
//busca todos  os usuarios no banco de dados
async function getProduto(){
try{
 const [linhas] = await conexao.query(`
 select * from tb_produtos
 `)
 return linhas;
}catch(erro){
    return erro;
}
}

//busca os usuarios pelo ID

async function getProdutoById(id){
    try{
     const [linhas] = await conexao.query(`
     select * from tb_produtos where id = ?
     `,[id])
     return linhas;
    }catch(erro){
        return erro;
    }
    }
    

//Insere um usuário no banco de dados
async function addProduto(
   descricao,
   unid_medida,
   valor,
   tipo){
        try{
            const [exec] = await conexao.query(`
           insert into tb_produtos(
           descricao,unid_medida,valor,tipo
           )values(
           ?,?,?,?
           )
            `,[descricao,unid_medida,valor,tipo])
            return exec.affectedRows;
           }catch(erro){
               return erro;
           }
}



//Função para buscar todos os usuários do banco
async function buscaTodosProduto(){
    //Estrutura de tentativa try...catch para
    //capturar erros
    try{
    //Abre a conexão e informa a query
        let [linhas] = await conexao.query(`
          select 
                id,
                descricao,
                unid_medida,
                valor,
                tipo
                from tb_produtos;       
        `)
        //Retorna valores buscados no banco
        return linhas;
    }catch(e){
        //Retorna o erro que aconteceu
        return e;
    }
}
module.exports = {
    getProduto,
    getProdutoById,
    addProduto,
    buscaTodosProduto
};