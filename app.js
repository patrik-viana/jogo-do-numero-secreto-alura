// serve para criar a variável que buscará um valor do html, h1 é a tag que ele irá buscar, linha 22
// let titulo = document.querySelector('h1');
// // Inserir o valor da variável sabendo que virá do html
// titulo.innerHTML = 'Jogo do número secreto';

// // serve para criar a variável que buscará um valor do html, p é a tag que ele irá buscar, linha 23
// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';


// Para não precisar reescrever código muito parecidos, podemos criar funções
// e depois chamá-las. Em Javascript você pode criar as funções a qualquer momento
// pois o javascript armazena elas e utiliza somente quando chamadas, mesmo que
// tenham sido criadas depois de quando foi chamada, isso somente em javascript

// a função abaixo será criada para substituir os códigos das linhas 2 até 8

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


exibirMensagemInicial();

function exibirTextoNaTela(tag, texto) { // função com parâmetro que executa algo mas que não precisa nos devolver a informação
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // puxar o resurso de voz sempre que exibir texto na tela,
    // com o idioma brazilian portuguese female e com velocidade de reprodução 1.2
}

function exibirMensagemInicial() { 
    exibirTextoNaTela('h1', 'Jogo do número secreto'); 
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10'); I
}

function verificarChute() { // função sem parâmetro e sem retorno
    let chute = document.querySelector('input').value; // pra puxar o valor de dentro do input e não o input inteiro
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você acertou!');
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled') // linha 28 do html
    }
    else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        }
        else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        // tentativas = tentativas + 1
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() { // função sem parâmetro, porém que esperamos um retorno
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // verificar se o numero está na lista
        return gerarNumeroAleatorio();
    }
    else {
        listaDeNumerosSorteados.push(numeroEscolhido); // insere o numero ao final da lista
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}