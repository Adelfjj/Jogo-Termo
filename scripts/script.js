import palavras from './data.js';

let fechar = document.querySelector('#fechar');
let dialogo = document.querySelector('.dialogo');
let regras = document.querySelector('.regras');
let palavra = document.querySelectorAll('.palavra');
let resposta = document.querySelector(".mensagem div");
let teclado = document.querySelectorAll("section#teclado span");

let item = 0;
let linha = 0;

var inputLetra = [];
var sorteada;
var cAcento;
var sAcento;

window.onload = function(){
    startGame();
    palavra[linha].children[item].focus();
};
const startGame = () =>{
    cAcento = sortearPalavra();
    sAcento = removerAcentos(cAcento);
    sorteada = sAcento.split("");

    document.addEventListener("keyup", (e) =>{
        if(ehLetra(e)){
            let letra = palavra[linha].children[item];
            inserirLetra(letra,e);
        }
        else if(e.key == "Enter" && item == 5){
            comparaPalavra();
        }else if(e.key == "Backspace"){
            deletarLetra();
        }
    });
};
const inserirLetra = (letra, e) =>{
    if(item < 5 && linha < 5){
        letra.textContent = e.key;
        inputLetra.push(e.key);
        item++;
        focar();
    }
};
const deletarLetra = () =>{
    if(item >= 1 && item != 0){
        item--;
        let letra = palavra[linha].children[item];
        inputLetra.pop();
        letra.textContent = "";
        focar();
    }
};
const comparaPalavra = () =>{
    for(let index = 0; index < 5;index++){
        if(sorteada[index] == inputLetra[index]){
            let letra = palavra[linha].children[index];
            letra.classList.add("correto");
            letraTeclado(inputLetra[index],"correto");
        }
        else if(sorteada.includes(inputLetra[index])){
            let letra = palavra[linha].children[index];
            letra.classList.add("contem");
            letraTeclado(inputLetra[index],"contem");
        }else{
            letraTeclado(inputLetra[index],"excluir");
        }
    }
    proxima();
};

const ehLetra = (e) =>{
    if(item <= 5 && "KeyA" <= e.code && e.code <= "KeyZ" || e.code == "Semicolon"){
        return true;
    }
};
const proxima = () =>{
    if(linha < 4){
        linha++;
        item = 0;
        palavra[linha].classList.add("active");
        inputLetra = [];
    }else if(linha == 4){
        mensagem();
    }
}

const focar = () =>{
    if(item < 5){
        let itemFoco = palavra[linha].children[item];
        itemFoco.focus();
    }
}

const sortearPalavra = () =>{
    return palavras[Math.floor(Math.random()*palavras.length)];
}

fechar.addEventListener("click",()=>{
    dialogo.style.display = "none";
});

regras.addEventListener("click", () =>{
    dialogo.style.display = "flex";
});

const mensagem = () =>{
    cAcento = cAcento.split('');

    for(let i= 0; i < cAcento.length; i++){
        resposta.innerHTML += `<span class="letra correto">${cAcento[i]}</span>`
    }

    resposta.parentNode.style.display = "block";
}

const removerAcentos = (s) => {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const letraTeclado = (letra, clas) => {
    teclado.forEach(span => {
        if(span.innerHTML == letra){
           span.classList.add(`${clas}`);
        }
    });
}