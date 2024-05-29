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

const grid = document.querySelector('.grid');
// const player = document.querySelector('.player');
const tempo = document.querySelector('.time');




const personagens = [
    'peao_branco',
    'cavalo_branco',
    'bispo_branco',
    'torre_branco',
    'rainha_branco_peca',
    'rei_branco',
    'peao_preto',
    'bispo_preto',
    'cavalo_preto',
    'torre_preto',
    'rainha_preta',
    'rei_preto',
];

const criarElemento = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let primeiraCarta = '';
let segundaCarta = '';

const fimdeJogo = () => {
    const carddasabilitado = document.querySelectorAll('.card-dasabilitado');

    if (carddasabilitado.length == 24) {
        clearInterval(this.loop);
        // alert(`Parabéns, ${player.innerHTML}. Seu tempo foi ${tempo.innerHTML} segundos`)

        let tempoFinal = parseInt(tempo.innerHTML, 10); // Extrai e converte para número


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

const verificarCards = () => {

    const primeiroPersonagem = primeiraCarta.getAttribute('data-personagem');
    const segundoPersonagem = segundaCarta.getAttribute('data-personagem');

    if (primeiroPersonagem == segundoPersonagem) {

        primeiraCarta.firstChild.classList.add('card-dasabilitado');
        segundaCarta.firstChild.classList.add('card-dasabilitado');

        primeiraCarta = '';
        segundaCarta = '';

        fimdeJogo();

    } else {
        setTimeout(() => {

            primeiraCarta.classList.remove('revelar-card');
            segundaCarta.classList.remove('revelar-card');

            primeiraCarta = '';
            segundaCarta = '';


        }, 500);
    }

}

const revelarCard = ({ target }) => {
    if (target.parentNode.className.includes('revelar-card')) {
        return;
    }

    if (primeiraCarta == '') {
        target.parentNode.classList.add('revelar-card')
        primeiraCarta = target.parentNode;

    } else if (segundaCarta == '') {
        target.parentNode.classList.add('revelar-card')
        segundaCarta = target.parentNode;

        verificarCards();

    }
}

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

const loadGame = () => {

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
    // player.innerHTML = localStorage.getItem('player');
    IniciarTempo();
    loadGame();
}