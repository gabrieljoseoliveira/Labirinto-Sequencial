import {Iniciar} from '../assets/telas/titulo.js';
import {Jogo} from '../assets/telas/jogo.js';
import {Ganhou} from '../assets/telas/ganhou.js';
import {Fim} from '../assets/telas/fim.js';

/**
 * Inicialização e configuração do Phaser;
 * Funções para mostrar o tutorial e créditos;
 * Os botões das questões do Quiz, cuidado pois contém 
 * os spoilers das respostas corretas.
 */

const configuracoes = {
    renderer: Phaser.AUTO,
    width: 808,
    height: 616,
    antialias: true,
    multiTexture: true,
    transparent: false,
    parent: ``,
    state: {},
    physics: {
        default: `arcade`,
        arcade: {
            debug: false
        }
    },
    scene: [
        Iniciar,
        Jogo,
        Ganhou,
        Fim
    ]
};

const jogo = new Phaser.Game(configuracoes);

const funcoesTitulo = new Iniciar();
const funcoesJogo = new Jogo();

//Tutorial
document.querySelector(`#okay`).addEventListener("click", () => {
    funcoesTitulo.mostrarJogo(`tutorial`);
});

// Créditos
document.querySelector(`#okay2`).addEventListener("click", () => {
   funcoesTitulo.mostrarJogo(`creditos`);
});

// Questão 01
document.querySelector("#q01A").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q01");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q01B").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q01");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q01C").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q01");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q01D").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q01");
    funcoesJogo.acertouQuestao();
    document.getElementById("q01D").disabled = true;
});

document.querySelector("#q01E").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q01");
    funcoesJogo.errouQuestao();
});

// Questão 02
document.querySelector("#q02A").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q02");
    funcoesJogo.errouQuestao("q02");
});

document.querySelector("#q02B").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q02");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q02C").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q02");
    funcoesJogo.acertouQuestao();
    document.getElementById("q02C").disabled = true;
});

document.querySelector("#q02D").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q02");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q02E").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q02");
    funcoesJogo.errouQuestao();
});

// Questão 03
document.querySelector("#q03A").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q03");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q03B").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q03");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q03C").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q03");
    funcoesJogo.acertouQuestao();
    document.getElementById("q03C").disabled = true;
});

document.querySelector("#q03D").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q03");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q03E").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q03");
    funcoesJogo.errouQuestao();
});

// Questão 04
document.querySelector("#q04A").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q04");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q04B").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q04");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q04C").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q04");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q04D").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q04");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q04E").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q04");
    funcoesJogo.acertouQuestao();
    document.getElementById("q04E").disabled = true;
});

// Questão 05
document.querySelector("#q05A").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q05");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q05B").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q05");
    funcoesJogo.acertouQuestao();
    document.getElementById("q05B").disabled = true;
});

document.querySelector("#q05C").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q05");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q05D").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q05");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q05E").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q05");
    funcoesJogo.errouQuestao();
});

// Questão 06
document.querySelector("#q06A").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q06");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q06B").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q06");
    funcoesJogo.acertouQuestao();
    document.getElementById("q06B").disabled = true;
});

document.querySelector("#q06C").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q06");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q06D").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q06");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q06E").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q06");
    funcoesJogo.errouQuestao();
});

// Questão 07
document.querySelector("#q07A").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q07");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q07B").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q07");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q07C").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q07");
    funcoesJogo.acertouQuestao();
    document.getElementById("q07C").disabled = true;
});

document.querySelector("#q07D").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q07");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q07E").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q07");
    funcoesJogo.errouQuestao();
});

// Questão 08
document.querySelector("#q08A").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q08");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q08B").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q08");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q08C").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q08");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q08D").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q08");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q08E").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q08");
    funcoesJogo.acertouQuestao();
    document.getElementById("q08E").disabled = true;
});

// Questão 09
document.querySelector("#q09A").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q09");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q09B").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q09");
    funcoesJogo.acertouQuestao();
    document.getElementById("q09B").disabled = true;
});

document.querySelector("#q09C").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q09");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q09D").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q09");
    funcoesJogo.errouQuestao();
});

document.querySelector("#q09E").addEventListener("click", () => {
    funcoesJogo.mostrarJogo("q09");
    funcoesJogo.errouQuestao();
});
