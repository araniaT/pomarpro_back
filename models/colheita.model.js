const conexao = require('../database/connection.database');
//busca todos  os usuarios no banco de dados
async function getColheita(){
try{
 const [linhas] = await conexao.query(`
 select * from tb_colheita
 `)
 return linhas;
}catch(erro){
    return erro;
}
}

//busca os usuarios pelo ID

async function getColheitaById(id){
    try{
     const [linhas] = await conexao.query(`
     select * from tb_colheita where id = ?
     `,[id])
     return linhas;
    }catch(erro){
        return erro;
    }
    }
    

//Insere um usuário no banco de dados
async function addColheita(
    quantidade,
    dt_colheita,
    arvore_id
    ){
        try{
            const [exec] = await conexao.query(`
           insert into tb_colheita(
           quantidade,dt_colheita,arvore_id
           )values(
           ?,?,?
           )
            `,[quantidade,dt_colheita,arvore_id])
            return exec.affectedRows;
           }catch(erro){
               return erro;
           }
}



//Função para buscar todos os usuários do banco
async function buscaTodosColheita(){
    //Estrutura de tentativa try...catch para
    //capturar erros
    try{
    //Abre a conexão e informa a query
        let [linhas] = await conexao.query(`
            select 
                id,
                quantidade,
                dt_colheita,
                arvore_id
                from tb_colheita;    
        `)
        //Retorna valores buscados no banco
        return linhas;
    }catch(e){
        //Retorna o erro que aconteceu
        return e;
    }
}
module.exports = {
    getColheita,
    getColheitaById,
    addColheita,
    buscaTodosColheita
};