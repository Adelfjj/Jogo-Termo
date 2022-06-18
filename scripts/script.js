import palavras from './data.js';

let fechar = document.querySelector('#fechar');
let dialogo = document.querySelector('.dialogo');
let regras = document.querySelector('.regras');
let palavra = document.querySelectorAll('.palavra');

let item = 0;
let linha = 0;

var inputLetra = [];
var word;

window.onload = function(){
    startGame();
    palavra[linha].children[item].focus();
};
const startGame = () =>{
    word = sortearPalavra();
    document.addEventListener("keyup", (e) =>{
        if(ehLetra(e)){
            let letra = palavra[linha].children[item];
            inserirLetra(letra,e);
        }
        else if(e.key == "Enter"){
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
    let splitWord = word.split("");
    for(let index = 0; index < 5;index++){
        if(splitWord[index] == inputLetra[index]){
            let letra = palavra[linha].children[index];
            letra.classList.add("correto");
        }
        else if(splitWord.includes(inputLetra[index])){
            let letra = palavra[linha].children[index];
            letra.classList.add("contem");
        }
    }
    proxima();
};

const ehLetra = (e) =>{
    if(item <= 5 && "KeyA" <= e.code && e.code <= "KeyZ"){
        return true;
    }
};
const proxima = () =>{
    if(linha < 4){
        linha++;
        item = 0;
        palavra[linha].classList.add("active");
        inputLetra = [];
    }
}

const focar = () =>{
    if(item < 5){
        let itemFoco = palavra[linha].children[item];
        itemFoco.focus();
    }
}

const sortearPalavra = () =>{
    let sorteada = palavras[Math.floor(Math.random()*palavras.length)];
    return sorteada;
}

fechar.addEventListener("click",()=>{
    dialogo.style.display = "none";
});

regras.addEventListener("click", () =>{
    dialogo.style.display = "flex";
});