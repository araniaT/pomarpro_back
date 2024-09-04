const conexao = require('../database/connection.database');
//busca todos  os usuarios no banco de dados
async function getMovimento(){
try{
 const [linhas] = await conexao.query(`
 select * from tb_movimentacao
 `)
 return linhas;
}catch(erro){
    return erro;
}
}

//busca os usuarios pelo ID

async function getMovimentoById(id){
    try{
     const [linhas] = await conexao.query(`
     select * from tb_movimentacao where id = ?
     `,[id])
     return linhas;
    }catch(erro){
        return erro;
    }
    }
    

//Insere um usuário no banco de dados
async function addMovimento(
    tipo
    ){
        try{
            const [exec] = await conexao.query(`
           insert into tb_movimentacao(
           dt_movimentacao,tipo
           )values(
           current_timestamp,?
           )
            `,[tipo]);

            if(exec.affectedRows==1){
                const [linha] = await conexao.query(`select last_insert_id() as id`);
                return linha[0];
            }
            return exec.affectedRows;
           }catch(erro){
               return erro;
           }
}

async function addItemMovimento(
    movimento,quantidade,produto
    ){
        try{
            const [exec] = await conexao.query(`
           insert into tb_mov_item(
           movimentacao_id,produtos_id,quantidade
           )values(
           ?,?,?
           )
            `,[movimento,produto,quantidade]);
            return exec.affectedRows;
           }catch(erro){
               return erro;
           }
}

//Função para buscar todos os usuários do banco
async function buscaTodosMovimento(){
    //Estrutura de tentativa try...catch para
    //capturar erros
    try{
    //Abre a conexão e informa a query
        let [linhas] = await conexao.query(`
            select
                p.descricao,
                p.valor,
                m.tipo,
                t.descricao as ds_tipo,
                m.dt_movimentacao,
                mi.quantidade,
                (p.valor * mi.quantidade) as valor_total
            from tb_produtos p
                inner join tb_mov_item mi on mi.produtos_id = p.id
                inner join tb_movimentacao m on m.id = mi.movimentacao_id
                inner join tb_tipo t on t.id = m.tipo   
        `)
        //Retorna valores buscados no banco
        return linhas;
    }catch(e){
        //Retorna o erro que aconteceu
        return e;
    }
}
module.exports = {
    getMovimento,
    getMovimentoById,
    addMovimento,
    buscaTodosMovimento,
    addItemMovimento
};