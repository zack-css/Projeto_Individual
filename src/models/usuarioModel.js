var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegar(pontos, idUsuario) {

    var instrucao = `

    INSERT INTO resultadoMemoria VALUES ( null, ${pontos}, ${idUsuario}
        );
        
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pontosUsuario(idUsuario) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pontosUsuario()");
    var instrucao = `
    SELECT tempo as resultadoTempo FROM resultadoMemoria where fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function maiorPontuacaoUser(idUsuario) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function maiorPontuacaoUser()");
    var instrucao = `
    SELECT MIN(tempo) AS menor_tempo
    FROM resultadoMemoria
    WHERE fkUsuario = ${idUsuario};
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



function mediaDosUsuarios() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function mediaDosUsuarios()");
    var instrucao = `
	SELECT round(avg(tempo),0) as mediaPontosUsuarios FROM resultadoMemoria;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function contar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function contar()");
    var instrucao = `
    SELECT count(id) as QtdUsuarios FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function melhorPontuacao() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function melhorPontuacao()");
    var instrucao = `
    SELECT MIN(tempo) AS menor_tempo_geral
    FROM resultadoMemoria
    ;
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function ultimoPonto(idUsuario) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function ultimoPonto()");
    var instrucao = `
    SELECT tempo as ultimo_ponto FROM resultadoMemoria where fkUsuario = ${idUsuario} order by idJogo desc limit 1;    
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function listar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
    WITH RankedResults AS (
        SELECT 
            a.idJogo,
            a.tempo,
            a.fkUsuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha,
            ROW_NUMBER() OVER (PARTITION BY a.fkUsuario ORDER BY a.tempo ASC) AS ran
        FROM resultadoMemoria a
        INNER JOIN usuario u
            ON a.fkUsuario = u.id
    )
    SELECT 
        idJogo,
        tempo,
        fkUsuario,
        idUsuario,
        nome,
        email,
        senha
    FROM RankedResults
    WHERE ran = 1
    ORDER BY tempo ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




module.exports = {
    autenticar,
    cadastrar,
    pegar,
    pontosUsuario,
    mediaDosUsuarios,
    contar,
    melhorPontuacao,
    maiorPontuacaoUser,
    ultimoPonto,
    listar
};