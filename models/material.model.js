const conexao = require('../database/connection.database');
//busca todos  os usuarios no banco de dados
async function getMaterial(){
try{
 const [linhas] = await conexao.query(`
 select * from tb_materiais
 `)
 return linhas;
}catch(erro){
    return erro;
}
}

//busca os usuarios pelo ID

async function getMaterialById(id){
    try{
     const [linhas] = await conexao.query(`
     select * from tb_materiais where id = ?
     `,[id])
     return linhas;
    }catch(erro){
        return erro;
    }
    }
    

//Insere um usuário no banco de dados
async function addMaterial(
    nome,
    valor,
    fornecedor,
    tipo){
        try{
            const [exec] = await conexao.query(`
           insert into tb_materiais(
           nome,valor,fornecedor,tipo
           )values(
           ?,?,?,?
           )
            `,[nome,valor,fornecedor,tipo])
            return exec.affectedRows;
           }catch(erro){
               return erro;
           }
}



//Função para buscar todos os usuários do banco
async function buscaTodosMaterial(){
    //Estrutura de tentativa try...catch para
    //capturar erros
    try{
    //Abre a conexão e informa a query
        let [linhas] = await conexao.query(`
            select 
                id,
                nome,
                valor,
                fornecedor,
                tipo
                from tb_materiais;    
        `)
        //Retorna valores buscados no banco
        return linhas;
    }catch(e){
        //Retorna o erro que aconteceu
        return e;
    }
}
module.exports = {
    getMaterial,
    getMaterialById,
    addMaterial,
    buscaTodosMaterial
};