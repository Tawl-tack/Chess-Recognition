import { DataTypes } from "sequelize";
import mysql from "../mysql.js";

const Usuario = mysql.define('Usuario', {
    // id_assinatura: DataTypes.INTEGER,    
    nome: DataTypes.STRING,  
    email: DataTypes.STRING,  
    senha: DataTypes.STRING,  
    // data_criacao: DataTypes.DATE 
    // id_tentativa_puzzle INT,  
    // id_conversao INT
});

const Plano = mysql.define('Plano', {
    //  idAssinatura INT,  
    //  id_plano INT PRIMARY KEY,  
    nome_plano: DataTypes.STRING,  
    preco_plano: DataTypes.FLOAT,  
    duracao_dias: DataTypes.INTEGER,  
    limite_conversoes: DataTypes.INTEGER  
});

const Assinatura = mysql.define('Assinatura', {
    // id_assinatura INT PRIMARY KEY,  
    data_inicio: DataTypes.STRING,  
    data_fim: DataTypes.STRING,  
    status_assinatura: DataTypes.STRING  
    // id_pagamento INT
});

const MetodoPagamento = mysql.define('MetodoPagamento', {
    // id_pagamento INT,  
    // id_metodo_pagamento INT PRIMARY KEY,  
    nome_metodo_pagamento: DataTypes.STRING
});

const Pagamento = mysql.define('Pagamento', {
    // id_pagamento INT PRIMARY KEY,  
    // id_metodo_pagamento INT,  
    data_pagamento: DataTypes.STRING,  
    valor_pagamento: DataTypes.FLOAT,  
    status_pagamento: DataTypes.STRING 
    // id_metodo_pagamento INT
});

const Conversao = mysql.define('Conversao', {
    // id_conversao INT PRIMARY KEY,  
    // data_hora_conversao: DataTypes.DATE,  
    fen_gerado: DataTypes.STRING,  
    precisao: DataTypes.FLOAT
});

const Puzzle = mysql.define('Puzzle', {
    // id_puzzle INT PRIMARY KEY,  
    // id_tentativa_puzzle INT,  
    fen_inicial: DataTypes.STRING,  
    movimento_correto: DataTypes.STRING,  
    dificuldade: DataTypes.STRING,
    // data_criacao: DataTypes.DATE
});

const TentativaPuzzle = mysql.define('TentativaPuzzle', {
    // id_tentativa_puzzle INT PRIMARY KEY,  
    // id_puzzle INT,  
    // data_hora_tentativa: DataTypes.DATE,  
    resposta_usuario: DataTypes.STRING,  
    correta: DataTypes.STRING 
    // id_puzzle INT
});

Assinatura.belongsTo(Usuario);
Usuario.hasMany(Assinatura);

Usuario.hasMany(Conversao);
Conversao.belongsTo(Usuario);

Usuario.hasMany(TentativaPuzzle);
TentativaPuzzle.belongsTo(Usuario);

TentativaPuzzle.belongsTo(Puzzle);
Puzzle.hasMany(TentativaPuzzle);

Assinatura.belongsTo(Plano);
Plano.hasMany(Assinatura);

Assinatura.hasMany(Pagamento);
Pagamento.belongsTo(Assinatura);

Pagamento.belongsTo(MetodoPagamento);
MetodoPagamento.hasMany(Pagamento);


mysql.sync();

export { Usuario, Plano, Assinatura, MetodoPagamento, Pagamento, Conversao, Puzzle, TentativaPuzzle };

