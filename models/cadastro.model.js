const conexao = require('../database/connection.database');
//busca todos  os usuarios no banco de dados
async function getCadastro(){
try{
 const [linhas] = await conexao.query(`
 select * from tb_pomar
 `)
 return linhas;
}catch(erro){
    return erro;
}
}

//busca os usuarios pelo ID

async function getCadastroById(id){
    try{
     const [linhas] = await conexao.query(`
     select * from tb_pomar where id = ?
     `,[id])
     return linhas;
    }catch(erro){
        return erro;
    }
    }
    

//Insere um usuário no banco de dados
async function addCadastro(
    apelido,
    num_linhas,
    num_colunas
    ){
        try{
            const [exec] = await conexao.query(`
           insert into tb_pomar(
           apelido,num_linhas,num_colunas
           )values(
           ?,?,?
           )
            `,[apelido,num_linhas,num_colunas])
            return exec.affectedRows;
           }catch(erro){
               return erro;
           }
}



//Função para buscar todos os usuários do banco
async function buscaTodosCadastro(){
    //Estrutura de tentativa try...catch para
    //capturar erros
    try{
    //Abre a conexão e informa a query
        let [linhas] = await conexao.query(`
            select 
                id,
                apelido,
                num_linhas,
                num_colunas
                from tb_pomar;    
        `)
        //Retorna valores buscados no banco
        return linhas;
    }catch(e){
        //Retorna o erro que aconteceu
        return e;
    }
}
module.exports = {
    getCadastro,
    getCadastroById,
    addCadastro,
    buscaTodosCadastro
};