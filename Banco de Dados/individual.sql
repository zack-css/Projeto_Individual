use xadrez;

create table usuario(
id int primary key auto_increment,
nome varchar(50),
email varchar (50),
senha varchar (50)
);


CREATE TABLE comunidade(
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

CREATE TABLE resultadoMemoria (
	idJogo INT PRIMARY KEY AUTO_INCREMENT,
    tempo int,
    fkUsuario INT, constraint fkU foreign key (fkUsuario) references usuario(id)
    ); 
     
     
     -- Qauntidade de usuario
	SELECT count(id) as QtdUsuarios FROM usuario;
    
   -- melhor  pontuação do jogador
    SELECT MIN(tempo) AS menor_tempo
	FROM resultadoMemoria
	WHERE fkUsuario = 4;
    
    
    -- melhor pontuação geral
	SELECT MIN(tempo) AS menor_tempo
	FROM resultadoMemoria;
    
    
    -- historico de vezes jogados
    SELECT tempo FROM resultadoMemoria as QtdUsuarios where fkUsuario = '4';
    
    -- media de pontos 
	SELECT round(avg(tempo),0) as media  FROM resultadoMemoria;
    
    -- ultima partida jogada pelo usuario
	SELECT tempo as ultimo_ponto FROM resultadoMemoria where fkUsuario = 4 order by idJogo desc limit 1; 
        
        