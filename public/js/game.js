function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// Seleciona elementos do DOM para o grid de cartas e o temporizador
const grid = document.querySelector('.grid');
const tempo = document.querySelector('.time');




const personagens = [
    // 'peao_branco',
    // 'cavalo_branco',
    // 'bispo_branco',
    // 'torre_branco',
    // 'rainha_branco_peca',
    // 'rei_branco',
    'peao_preto',
    'bispo_preto',
    'cavalo_preto',
    'torre_preto',
    'rainha_preta',
    'rei_preto',
];


// Função para criar um elemento HTML com uma classe específica
const criarElemento = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let primeiraCarta = '';
let segundaCarta = '';

// Função para verificar se o jogo terminou
const fimdeJogo = () => {
    const carddasabilitado = document.querySelectorAll('.card-dasabilitado');

    // Se todas as cartas estão desabilitadas (viradas), o jogo termina
    if (carddasabilitado.length == 12) {
        clearInterval(this.loop); // Para o temporizador

        let tempoFinal = parseInt(tempo.innerHTML, 10); 
        var idUsuario = sessionStorage.getItem('ID_USUARIO')

        fetch(`/usuarios/pegar/${idUsuario}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js

                tempoPontuacaoServer: tempoFinal
            }),
        }).then(res => {
            console.log(res);
        });
        alert(`Parabéns!! Seu tempo foi ${tempo.innerHTML} segundos`)
        window.location = "./dashboard.html";

    }
}


// Função para verificar se as cartas viradas são iguais
const verificarCards = () => {

    const primeiroPersonagem = primeiraCarta.getAttribute('data-personagem');
    const segundoPersonagem = segundaCarta.getAttribute('data-personagem');

     // Se as cartas são iguais, desabilita-as
    if (primeiroPersonagem == segundoPersonagem) {

        primeiraCarta.firstChild.classList.add('card-dasabilitado');
        segundaCarta.firstChild.classList.add('card-dasabilitado');

        primeiraCarta = '';
        segundaCarta = '';

        fimdeJogo();

    } else {
         // Se as cartas são diferentes, vira-as novamente após 0.5 segundos
        setTimeout(() => {

            primeiraCarta.classList.remove('revelar-card');
            segundaCarta.classList.remove('revelar-card');

            primeiraCarta = '';
            segundaCarta = '';


        }, 500);
    }

}

// Função para revelar a carta quando clicada
const revelarCard = ({ target }) => {

     // Verifica se o elemento pai do target já contém a classe 'revelar-card' (se a carta já está virada)
     if (target.parentNode.className.includes('revelar-card')) {
        return; // Se já está virada, não faz nada
    }

    // Se 'primeiraCarta' está vazia, significa que essa é a primeira carta a ser virada
    if (primeiraCarta == '') {
        target.parentNode.classList.add('revelar-card'); // Adiciona a classe 'revelar-card' ao elemento pai do target (vira a carta)
        primeiraCarta = target.parentNode; // Define 'primeiraCarta' como o elemento pai do target (carta atual)
    } else if (segundaCarta == '') { // Se 'segundaCarta' está vazia, significa que essa é a segunda carta a ser virada
        target.parentNode.classList.add('revelar-card'); // Adiciona a classe 'revelar-card' ao elemento pai do target (vira a carta)
        segundaCarta = target.parentNode; // Define 'segundaCarta' como o elemento pai do target (carta atual)

        verificarCards(); // Verifica se as duas cartas viradas são iguais
    }
}

// Função para criar uma carta do jogo
const CriarCard = (personagem) => {

    // vai criar a div card la do HTML
    const card = criarElemento('div', 'card');
    const frente = criarElemento('div', 'face frente');
    const costa = criarElemento('div', 'face costas');

    frente.style.backgroundImage = `url('../assets/imgs/${personagem}.png')`;

    // appendChild acresenta um filho no caso o card
    card.appendChild(frente);
    card.appendChild(costa);

    card.addEventListener('click', revelarCard);
    card.setAttribute('data-personagem', personagem)

    return card;
}


// Função para carregar o jogo (embaralha e adiciona as cartas ao grid)
const loadGame = () => {

    // cria um novo array contendo duas cópias de cada personagem para formar os pares no jogo de memória.
    const duplicarCard = [...personagens, ...personagens];

    const embaralharCard = duplicarCard.sort(() => Math.random() - 0.5);

    embaralharCard.forEach((personagem) => {

        const card = CriarCard(personagem);
        grid.appendChild(card);

    });
}

const IniciarTempo = () => {
    this.loop = setInterval(() => {
        const disparo = + tempo.innerHTML;
        tempo.innerHTML = disparo + 1;
    }, 1000);
}

window.onload = () => {
    IniciarTempo();
    loadGame();
}