const conexao = require('../database/connection.database');
//busca todos  os usuarios no banco de dados
async function getArvores(){
try{
 const [linhas] = await conexao.query(`
 select * from tb_arvore
 `)
 return linhas;
}catch(erro){
    return erro;
}
}

//busca os usuarios pelo ID

async function getArvoresById(id){
    try{
     const [linhas] = await conexao.query(`
     select * from tb_arvore where id = ?
     `,[id])
     return linhas;
    }catch(erro){
        return erro;
    }
    }
    

//Insere um usuário no banco de dados
async function addArvores(
    defensivo,
    fertilizante,
    ultima_verifacao,
    coluna,
    linha,
    tipo,
    situacao,
    pomar
    
    ){
        try{
            const [exec] = await conexao.query(`
           insert into tb_arvore(
           defensivo,fertilizante,ultima_verifacao,coluna,linha,tipo,situacao,pomar
           )values(
           ?,?,?,?,?,?,?,?
           )
            `,[defensivo,fertilizante,ultima_verifacao,coluna,linha,tipo,situacao,pomar])
            return exec.affectedRows;
           }catch(erro){
               return erro;
           }
}



//Função para buscar todos os usuários do banco
async function buscaTodosArvores(){
    //Estrutura de tentativa try...catch para
    //capturar erros
    try{
    //Abre a conexão e informa a query
        let [linhas] = await conexao.query(`
            select 
                id,
                if(defensivo=1,"Sim","Não") as defensivo,
                if(fertilizante=1,"Sim","Não") as fertilizante,
                ultima_verifacao,
                coluna,
                linha,
                tipo,
                situacao,
                pomar
                from tb_arvore;    
        `)
        //Retorna valores buscados no banco
        return linhas;
    }catch(e){
        //Retorna o erro que aconteceu
        return e;
    }
}
module.exports = {
    getArvores,
    getArvoresById,
    addArvores,
    buscaTodosArvores
};