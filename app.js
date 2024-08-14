//chamando a função gerarNumeroAleatorio() e atribuindo a variavel numeroAleatorio
let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 1;

//criando a função alterarTextoNaTela() e chamando os paramêtros tag e texto que receberão os valores ao decorrer do código
function alterarTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

//função criada para limpar o campo input do HTML
function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

//função criada para verificar se o valor inserido no imput do HTML é igual ao número gerado pela função gerarNumeroAleatorio()
function verificarChute() {
    let chute = document.querySelector("input").value;
    
    if (chute == numeroAleatorio) {
        alterarTextoNaTela("h1", "Acertou!");
        palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa"; //analisando se a palavra "tentativas" será no plural
        alterarTextoNaTela("p", `Você acertou o número secreto com ${tentativas} ${palavraTentativa}.`);
        document.getElementById("reiniciar").removeAttribute("disabled"); //habilitando o botão "novo jogo"
        document.getElementById("chutar").setAttribute("disabled", true); //desabilitando o botão "chutar"
    } else if (chute > numeroAleatorio) {
        alterarTextoNaTela("p", "O número secreto é menor.");
    } else {
        alterarTextoNaTela("p", "O número secreto é maior.");
    }
    tentativas++;
    limparCampo();
}

//função para gerar o número aleatório
function gerarNumeroAleatorio(){
    let numeroGerado = parseInt(Math.random() * numeroLimite + 1);
    let qtdElementosLista = listaNumerosSorteados.length;
    
    if (qtdElementosLista == numeroLimite) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroGerado)){
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroGerado);
        return numeroGerado;
    }
}

//função ao pressionar o botão reinicar no HTML, reiniciando todo o sistema do jogo
function botaoReiniciar() {
    numeroAleatorio = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial()
    document.getElementById("reiniciar").setAttribute("disabled", true); //desabilitando o botão "novo jogo"
    document.getElementById("chutar").removeAttribute("disabled"); //habilitando o botão "chutar"
}

//chamando a função alterarTextoNaTela e atribuindo o que quer ser inserido nos parametrôs
function exibirMensagemInicial() {
    alterarTextoNaTela("h1", "Jogo do Número Secreto");
    alterarTextoNaTela("p", "Escolha um número de 1 a 10");
}

//chamando a função exibirMensagemInicial()
exibirMensagemInicial()

