// Classe da lógica do jogo
class Jogo extends Phaser.Scene {

    // Documento html
    html = document.documentElement;

    // Opções do menu
    ops = document.querySelector(`#opcoes`);

    // Idioma do jogo
    pt = document.querySelector(`#pt`);
    en = document.querySelector(`#en`);

    // Modo Daltônico
    dalt = document.querySelector(`#dalt`);

    // Tela do jogo
    canvas = document.querySelector(`canvas`);

    // Crônometro
    contaTempo = new Tempo();

    // div do crônometro
    relogio = document.querySelector(`#relogio`);

    // divs do contador de passos
    contaPassos = document.querySelector(`#contaPassos`);
    passosDados = document.querySelector(`#passosDados`);

    // Passos que o jogador deu
    passos = 0;

    // div das chaves coletadas pelo jogador
    chaves = document.querySelector(`#chaves`);

    chaves01 = document.querySelector(`#chave02`);
    chaves02 = document.querySelector(`#chave01`);

    // div das vidas do jogador
    vidas = document.querySelector(`#vidas`);

    vida01 = document.querySelector(`#vida01`);
    vida02 = document.querySelector(`#vida02`);
    vida03 = document.querySelector(`#vida03`);
    vida04 = document.querySelector(`#vida04`);
    vida05 = document.querySelector(`#vida05`);

    //div das questões coletadas do jogador
    qs = document.querySelector(`#qs`);

    qs01 = document.querySelector(`#qs01`);
    qs02 = document.querySelector(`#qs02`);
    qs03 = document.querySelector(`#qs03`);
    qs04 = document.querySelector(`#qs04`);
    qs05 = document.querySelector(`#qs05`);
    qs06 = document.querySelector(`#qs06`);
    qs07 = document.querySelector(`#qs07`);
    qs08 = document.querySelector(`#qs08`);
    qs09 = document.querySelector(`#qs09`);

    // Questões para coletar
    questoes;

    questao01;
    questao02;
    questao03;
    questao04;
    questao05;
    questao06;
    questao07;
    questao08;
    questao09;

    // Corações para coletar
    coras;

    cora01;
    cora02;

    // Variáveis para controlar a lógica do jogo
    jogo;
    azul;
    vermelho;
    amarelo;

    // Jogador, chaves e Troféu
    jogador;
    chave01;
    chave02;
    trofeu;

    // Botões
    bVoltar;
    bIniciar;
    bReiniciar;

    // Sons
    qSom;
    rSom;
    somPassos;

    pAz;
    azulSom;
    azulSom2;

    pVe;
    vermelhoSom;
    vermelhoSom2;

    pAm;
    amareloSom;
    amareloSom2;

    // Blocos
    blocosCinzas;
    blocosMarrons;
    blocosAzuis;
    blocosVermelhos;
    blocosAmarelos;

    // Blocos lilás
    blocosLilas

    blocoLilas01;
    blocoLilas02;

    // Blocos cinzas de obstáculo
    blocoCinzaChato01;
    blocoCinzaChato02;

    blocoCinzaChato03;
    blocoCinzaChato04;

    blocoCinzaChato05;
    blocoCinzaChato06;

    // Blocos amarelos de obstáculo
    blocosAmarelosChatos;

    blocoAmareloV15;
    blocoAmareloV14;
    blocoAmareloV13;
    blocoAmareloV12;
    blocoAmareloV01;
    blocoAmareloV02;
    blocoAmareloV03;
    blocoAmareloV05;
    blocoAmareloV06;
    blocoAmareloV07;
    blocoAmareloV08;
    blocoAmareloV09;
    blocoAmareloV10;
    blocoAmareloV11;

    blocoAmareloH02;
    blocoAmareloH05;
    blocoAmareloH06;
    blocoAmareloH08;
    blocoAmareloH09;
    blocoAmareloH10;
    blocoAmareloH11;
    blocoAmareloH12;
    blocoAmareloH13;

    // Setas do teclado
    setasDoTeclado;

    // Música do jogo
    musicaJogo;

    constructor() {

        super({key: `telaDoJogo`});

    }

    preload() {

        this.carregarImagens();
        this.carregarAudios();
        this.carregarSprites();

    }

    create() {

        this.criarJogador();

        this.criarSons();
        this.criarImagens();
        this.criarAnimacoes();

        this.criarBlocosCinzas();
        this.criarBlocosMarrons();

        this.criarBlocosAzuis();
        this.criarBlocosVermelhos();
        this.criarBlocosAmarelos();

        this.criarBlocosLilas();

        this.criarBlocosCinzasChatos();
        this.criarBlocosAmarelosChatos();

        this.criarCoracoes();
        this.criarQuestoes();

        this.criarBotaoIniciar();
        this.criarBotaoVoltar();
        this.criarBotaoReiniciar();

        this.criarChaves();
        this.criarTrofeu();

        this.ops.style.visibility = `hidden`;

    }

    update(time, delta) {

        super.update(time, delta);

        // Se o jogo foi iniciado então permite o movimento do jogador
        if (this.jogo == true) {

            this.iniciarMovimentos();
            this.envolverSprite(this.jogador);

        }

        if (this.jogo == true
            && !this.musicaJogo.isPlaying) {

            this.musicaJogo.play();

        }

        // Se o jogador perder todos os corações, então ocorre o game over
        if (this.jogo == true
            && this.vida05.className == `esconder`) {

            setTimeout(() => {

                this.gameOver();

            }, 450);

        }

    }

    gameOver() {

        // Paras os sons do jogo
        this.sound.stopAll();

        // Reposiciona os corações, questões, crônometro, chaves e contador de passos
        this.vidas.style.paddingLeft = `10000px`;
        this.qs.style.paddingLeft = `10000px`;
        this.relogio.style.paddingLeft = `10000px`;
        this.contaPassos.style.paddingLeft = `10000px`;
        this.chaves.style.paddingLeft = `10000px`;

        // Para a lógica do jogo
        this.jogo = false;

        // Reseta os passos
        this.passos = 0;
        this.passosDados.innerHTML = 0;

        // Para e reseta o crônometro
        this.contaTempo.stopTimer();
        this.contaTempo.resetTimer();

        // Anima a troca de telas
        setTimeout(() => {

            this.canvas.animate([{opacity: `0`, offset: 0}, {opacity: `1`, offset: 1}],
                975);

            this.scene.stop(`telaDoJogo`);
            this.scene.start(`telaDeFim`);

        }, 125);

    }

    carregarImagens() {

        // Carrega todos os arquivos de imagem
        this.load.image(`fundoJogo01`, `./assets/imagens/fundo/fundoJogo01.png`);
        this.load.image(`vidas`, `./assets/imagens/coração.png`);
        this.load.image(`questao`, `./assets/imagens/sprites/question.png`);
        this.load.image(`trofeu`, `./assets/imagens/sprites/trophy.png`);
        this.load.image(`chave`, `./assets/imagens/sprites/chave.png`);
        this.load.image(`blocoCinzaH`, `./assets/imagens/blocos/cinzaH.png`);
        this.load.image(`blocoCinzaV`, `./assets/imagens/blocos/cinzaV.png`);

        this.load.image(`blocoAzulHD`, `./assets/imagens/blocos/azulHD.png`);
        this.load.image(`blocoAzulVD`, `./assets/imagens/blocos/azulVD.png`);
        this.load.image(`blocoVermelhoHD`, `./assets/imagens/blocos/vermelhoHD.png`);
        this.load.image(`blocoVermelhoVD`, `./assets/imagens/blocos/vermelhoVD.png`);
        this.load.image(`blocoAmareloHD`, `./assets/imagens/blocos/amareloHD.png`);
        this.load.image(`blocoAmareloVD`, `./assets/imagens/blocos/amareloVD.png`);
        this.load.image(`blocoLilasHD`, `./assets/imagens/blocos/lilasHD.png`);
        this.load.image(`blocoLilasVD`, `./assets/imagens/blocos/lilasVD.png`);

        this.load.image(`blocoAzulHDE`, `./assets/imagens/blocos/azulHDE.png`);
        this.load.image(`blocoAzulVDE`, `./assets/imagens/blocos/azulVDE.png`);
        this.load.image(`blocoVermelhoHDE`, `./assets/imagens/blocos/vermelhoHDE.png`);
        this.load.image(`blocoVermelhoVDE`, `./assets/imagens/blocos/vermelhoVDE.png`);
        this.load.image(`blocoAmareloHDE`, `./assets/imagens/blocos/amareloHDE.png`);
        this.load.image(`blocoAmareloVDE`, `./assets/imagens/blocos/amareloVDE.png`);
        this.load.image(`blocoLilasHDE`, `./assets/imagens/blocos/lilasHDE.png`);
        this.load.image(`blocoLilasVDE`, `./assets/imagens/blocos/lilasVDE.png`);

        this.load.image(`blocoAzulH`, `./assets/imagens/blocos/azulH.png`);
        this.load.image(`blocoAzulV`, `./assets/imagens/blocos/azulV.png`);
        this.load.image(`blocoVermelhoH`, `./assets/imagens/blocos/vermelhoH.png`);
        this.load.image(`blocoVermelhoV`, `./assets/imagens/blocos/vermelhoV.png`);
        this.load.image(`blocoAmareloH`, `./assets/imagens/blocos/amareloH.png`);
        this.load.image(`blocoAmareloV`, `./assets/imagens/blocos/amareloV.png`);
        this.load.image(`blocoLilasH`, `./assets/imagens/blocos/lilasH.png`);
        this.load.image(`blocoLilasV`, `./assets/imagens/blocos/lilasV.png`);

        this.load.image(`blocoTransparenteH`, `./assets/imagens/blocos/transparenteH.png`);
        this.load.image(`blocoTransparenteV`, `./assets/imagens/blocos/transparenteV.png`);
        this.load.image(`blocoMarrom`, `./assets/imagens/blocos/marrom.png`);
        this.load.image(`bVoltar01`, `./assets/imagens/UI/blue_button04.png`);
        this.load.image(`bVoltar02`, `./assets/imagens/UI/blue_button05.png`);

        this.load.image(`bIniciar01`, `./assets/imagens/UI/blue_button02.png`);
        this.load.image(`bIniciar02`, `./assets/imagens/UI/blue_button03.png`);

        this.load.image(`bIniciar01E`, `./assets/imagens/UI/blue_button02E.png`);
        this.load.image(`bIniciar02E`, `./assets/imagens/UI/blue_button03E.png`);

        this.load.image(`bReiniciar01`, `./assets/imagens/UI/blue_button00.png`);
        this.load.image(`bReiniciar02`, `./assets/imagens/UI/blue_button01.png`);

        this.load.image(`bReiniciar01E`, `./assets/imagens/UI/blue_button00E.png`);
        this.load.image(`bReiniciar02E`, `./assets/imagens/UI/blue_button01E.png`);

    }

    carregarAudios() {

        // Carrega todos os arquivos de audio
        this.load.audio(`somPlayer`, `./assets/sons/CorrendoGrama.mp3`);
        this.load.audio(`somAzul`, `./assets/sons/azulSom.ogg`);
        this.load.audio(`somAzul2`, `./assets/sons/azulSom2.ogg`);
        this.load.audio(`somVermelho`, `./assets/sons/vermelhoSom.ogg`);
        this.load.audio(`somVermelho2`, `./assets/sons/vermelhoSom2.ogg`);
        this.load.audio(`somAmarelo`, `./assets/sons/amareloSom.ogg`);
        this.load.audio(`somAmarelo2`, `./assets/sons/amareloSom2.ogg`);
        this.load.audio(`somR`, `./assets/sons/rSom.ogg`);
        this.load.audio(`somQ`, `./assets/sons/qSom.ogg`);

    }

    carregarSprites() {

        // Carrega os sprites do jogador
        this.load.spritesheet(`player1`, `./assets/imagens/sprites/player5.png`,
            {frameWidth: 32, frameHeight: 60});
        this.load.spritesheet(`player2`, `./assets/imagens/sprites/player6.png`,
            {frameWidth: 32, frameHeight: 60});

    }

    criarSons() {

        // Música do jogo
        this.musicaJogo = this.sound.add(`musicaJogo`);

        // Som dos passos
        this.somPassos = this.sound.add(`somPlayer`);

        // Som dos blocos azuis
        this.azulSom = this.sound.add(`somAzul`);
        this.azulSom2 = this.sound.add(`somAzul2`);

        // Som dos blocos vermelhos
        this.vermelhoSom = this.sound.add(`somVermelho`);
        this.vermelhoSom2 = this.sound.add(`somVermelho2`);

        // Som dos blocos amarelos
        this.amareloSom = this.sound.add(`somAmarelo`);
        this.amareloSom2 = this.sound.add(`somAmarelo2`);

        // Som de reiniciar posição
        this.rSom = this.sound.add(`somR`);

        // Som das questões
        this.qSom = this.sound.add(`somQ`);

    }

    criarImagens() {

        // Imagem de fundo
        this.add.image(400, 300, `fundoJogo01`);

    }

    criarJogador() {

        // Jogador
        this.jogador = this.physics.add.sprite(47, 565).setVisible(false);
        this.jogador.setSize(1, 1);

        // Profundidade da imagem do jogador
        this.jogador.setDepth(1);

    }

    criarTrofeu() {

        // Troféu
        this.trofeu = this.physics.add.image(750, 60, `trofeu`)
            .setScale(0.15, 0.15)
            .setVisible(true);

        // Colisão do jogador com o troféu
        this.physics.add.overlap(this.jogador, this.trofeu, () => {

            this.trofeu.disableBody().setVisible(false, false);

            setTimeout(() => {

                this.acaoTrofeu();

            }, 450);

        });

    }

    acaoTrofeu() {

        // Para os sons do jogo
        this.sound.stopAll();

        // Reposiciona os corações, questões, cronômetro, chaves e contador de passos
        this.vidas.style.paddingLeft = `10000px`;
        this.qs.style.paddingLeft = `10000px`;
        this.chaves.style.paddingLeft = `10000px`;

        this.relogio.style.marginLeft = `47%`;
        this.relogio.style.paddingTop = `170px`;

        this.contaPassos.style.marginLeft = `47%`;
        this.contaPassos.style.paddingTop = `240px`;

        // Finaliza o jogo
        this.jogo = false;

        // Para o cronômetro
        this.contaTempo.stopTimer();

        // Animação de troca de tela
        setTimeout(() => {

            this.canvas.animate([{opacity: `0`, offset: 0}, {opacity: `1`, offset: 1}], 975);
            this.scene.stop(`telaDoJogo`);
            this.scene.start(`telaDeGanhou`);

        }, 125);

    }

    criarChaves() {

        // Chave01
        this.chave01 = this.physics.add.image(150, 60, `chave`)
            .setScale(0.10, 0.10)
            .setVisible(true);

        // Colisão do jogador com a chave01
        this.physics.add.overlap(this.jogador, this.chave01, () => {

            this.chave01.disableBody().setVisible(false, false);

            setTimeout(() => {

                this.acaoChaves(1);

            }, 450);

        });

        // Chave02
        this.chave02 = this.physics.add.image(750, 565, `chave`)
            .setScale(0.10, 0.10)
            .setVisible(true);

        // Colisão do jogador com a chave02
        this.physics.add.overlap(this.jogador, this.chave02, () => {

            this.chave02.disableBody().setVisible(false, false);

            setTimeout(() => {

                this.acaoChaves(2);

            }, 450);

        });

    }

    acaoChaves(numChave) {

        // Som ao pegar uma chave
        const somChaves = new Audio(`./assets/sons/somChaves.ogg`);
        somChaves.play();

        // Caso o jogador pegue a chave01
        if (numChave == 1) {

            this.chaves01.className = `mostrar`;

            this.blocoCinzaChato01.disableBody().setVisible(false, false);
            this.blocoCinzaChato02.disableBody().setVisible(false, false);

            this.blocoCinzaChato05.disableBody().setVisible(false, false);
            this.blocoCinzaChato06.disableBody().setVisible(false, false);

        }

        // Caso o jogador pegue a chave02
        if (numChave == 2) {

            this.chaves02.className = `mostrar`;

            this.blocoCinzaChato03.disableBody().setVisible(false, false);
            this.blocoCinzaChato04.disableBody().setVisible(false, false);

        }

    }

    criarAnimacoes() {

        // Animação
        const animacoess = this.anims;

        // Andar para frente
        animacoess.create({

            key: "front",
            frames: animacoess.generateFrameNames("player2", {start: 1, end: 9}),
            frameRate: 10,
            repeat: -1,

        });

        // Andar para trás
        animacoess.create({

            key: "back",
            frames: animacoess.generateFrameNames("player1", {start: 10, end: 19}),
            frameRate: 10,
            repeat: -1,

        });

        // Andar para direita
        animacoess.create({

            key: "right",
            frames: animacoess.generateFrameNames("player1", {start: 20, end: 29}),
            frameRate: 10,
            repeat: -1,

        });

        // Andar para esquerda
        animacoess.create({

            key: "left",
            frames: animacoess.generateFrameNames("player2", {start: 20, end: 29}),
            frameRate: 10,
            repeat: -1,

        });

    }

    criarBlocosCinzas() {

        // Grupo de blocos cinzas
        this.blocosCinzas = this.physics.add.staticGroup();

        // Profundidade dos blocos cinzas
        this.blocosCinzas.setDepth(2);

        // Colisão do jogador com blocos cinzas
        this.physics.add.collider(this.jogador, this.blocosCinzas);

        // Blocos cinzas verticais
        const blocoCinzaV01 = this.blocosCinzas.create(100, 57, `blocoCinzaV`);
        const blocoCinzaV02 = this.blocosCinzas.create(100, 157, `blocoCinzaV`);
        const blocoCinzaV03 = this.blocosCinzas.create(100, 257, `blocoCinzaV`);
        const blocoCinzaV05 = this.blocosCinzas.create(100, 457, `blocoCinzaV`);
        const blocoCinzaV37 = this.blocosCinzas.create(800, 57, `blocoCinzaV`);
        const blocoCinzaV38 = this.blocosCinzas.create(800, 157, `blocoCinzaV`);
        const blocoCinzaV44 = this.blocosCinzas.create(650, 608, `blocoCinzaH`);
        const blocoCinzaV40 = this.blocosCinzas.create(800, 357, `blocoCinzaV`);
        const blocoCinzaV41 = this.blocosCinzas.create(800, 457, `blocoCinzaV`);
        const blocoCinzaV42 = this.blocosCinzas.create(800, 557, `blocoCinzaV`);
        const blocoCinzaV43 = this.blocosCinzas.create(8, 557, `blocoCinzaV`);

        // Blocos cinzas horizontais
        const blocoCinzaH01 = this.blocosCinzas.create(150, 8, `blocoCinzaH`);
        const blocoCinzaH02 = this.blocosCinzas.create(250, 8, `blocoCinzaH`);
        const blocoCinzaH03 = this.blocosCinzas.create(350, 8, `blocoCinzaH`);
        const blocoCinzaH04 = this.blocosCinzas.create(450, 8, `blocoCinzaH`);
        const blocoCinzaH05 = this.blocosCinzas.create(550, 8, `blocoCinzaH`);
        const blocoCinzaH06 = this.blocosCinzas.create(650, 8, `blocoCinzaH`);
        const blocoCinzaH37 = this.blocosCinzas.create(150, 608, `blocoCinzaH`);
        const blocoCinzaH38 = this.blocosCinzas.create(250, 608, `blocoCinzaH`);
        const blocoCinzaH39 = this.blocosCinzas.create(350, 608, `blocoCinzaH`);
        const blocoCinzaH40 = this.blocosCinzas.create(450, 608, `blocoCinzaH`);
        const blocoCinzaH41 = this.blocosCinzas.create(550, 608, `blocoCinzaH`);
        const blocoCinzaH43 = this.blocosCinzas.create(750, 608, `blocoCinzaH`);
        const blocoCinzaH45 = this.blocosCinzas.create(50, 608, `blocoCinzaH`);
        const blocoCinzaH46 = this.blocosCinzas.create(50, 508, `blocoCinzaH`);
        const blocoCinzaH47 = this.blocosCinzas.create(750, 8, `blocoCinzaH`);

    }

    criarBlocosAzuis() {

        // Grupo de blocos azuis
        this.blocosAzuis = this.physics.add.staticGroup();

        // Colisão do jogador com blocos azuis
        this.physics.add.overlap(this.jogador, this.blocosAzuis, () => {

            if (this.azul) {

                this.passouPeloAzul();

            } else {

                this.errouOrdemDasCores(`azul`);

            }

        });

        if (this.dalt.checked) {

            if (this.pt.checked) {

                // Blocos azuis verticais do modo daltônico
                const blocoAzulV01 = this.blocosAzuis.create(100, 557, `blocoAzulVD`).setSize(2, 85);
                const blocoAzulV02 = this.blocosAzuis.create(200, 157, `blocoAzulVD`).setSize(2, 85);
                const blocoAzulV03 = this.blocosAzuis.create(200, 357, `blocoAzulVD`).setSize(2, 85);
                const blocoAzulv04 = this.blocosAzuis.create(300, 157, `blocoAzulVD`).setSize(2, 85);
                const blocoAzulV05 = this.blocosAzuis.create(300, 257, `blocoAzulVD`).setSize(2, 85);
                const blocoAzulV08 = this.blocosAzuis.create(500, 157, `blocoAzulVD`).setSize(2, 85);
                const blocoAzulV09 = this.blocosAzuis.create(500, 257, `blocoAzulVD`).setSize(2, 85);
                const blocoAzulV10 = this.blocosAzuis.create(500, 357, `blocoAzulVD`).setSize(2, 85);
                const blocoAzulV11 = this.blocosAzuis.create(500, 457, `blocoAzulVD`).setSize(2, 85);
                const blocoAzulV12 = this.blocosAzuis.create(600, 157, `blocoAzulVD`).setSize(2, 85);
                const blocoAzulV13 = this.blocosAzuis.create(600, 357, `blocoAzulVD`).setSize(2, 85);
                const blocoAzulV14 = this.blocosAzuis.create(700, 557, `blocoAzulVD`).setSize(2, 85);
                const blocoAzulV15 = this.blocosAzuis.create(700, 357, `blocoAzulVD`).setSize(2, 85);
                const blocoAzulV16 = this.blocosAzuis.create(600, 57, `blocoAzulVD`).setSize(2, 85);

                // Blocos azuis horizontais do modo daltônico
                const blocoAzulH11 = this.blocosAzuis.create(250, 408, `blocoAzulHD`).setSize(85, 2);
                const blocoAzulH01 = this.blocosAzuis.create(150, 108, `blocoAzulHD`).setSize(85, 2);
                const blocoAzulH02 = this.blocosAzuis.create(250, 508, `blocoAzulHD`).setSize(85, 2);
                const blocoAzulH03 = this.blocosAzuis.create(350, 408, `blocoAzulHD`).setSize(85, 2);
                const blocoAzulH04 = this.blocosAzuis.create(450, 108, `blocoAzulHD`).setSize(85, 2);
                const blocoAzulH05 = this.blocosAzuis.create(550, 508, `blocoAzulHD`).setSize(85, 2);
                const blocoAzulH06 = this.blocosAzuis.create(650, 208, `blocoAzulHD`).setSize(85, 2);
                const blocoAzulH07 = this.blocosAzuis.create(650, 408, `blocoAzulHD`).setSize(85, 2);
                const blocoAzulH08 = this.blocosAzuis.create(750, 308, `blocoAzulHD`).setSize(85, 2);
                const blocoAzulH09 = this.blocosAzuis.create(750, 108, `blocoAzulHD`).setSize(85, 2);
                const blocoAzulH10 = this.blocosAzuis.create(350, 108, `blocoAzulHD`).setSize(85, 2);

            } else if (this.en.checked) {

                // Blocos azuis verticais do modo daltônico em inglês
                const blocoAzulV01 = this.blocosAzuis.create(100, 557, `blocoAzulVDE`).setSize(2, 85);
                const blocoAzulV02 = this.blocosAzuis.create(200, 157, `blocoAzulVDE`).setSize(2, 85);
                const blocoAzulV03 = this.blocosAzuis.create(200, 357, `blocoAzulVDE`).setSize(2, 85);
                const blocoAzulv04 = this.blocosAzuis.create(300, 157, `blocoAzulVDE`).setSize(2, 85);
                const blocoAzulV05 = this.blocosAzuis.create(300, 257, `blocoAzulVDE`).setSize(2, 85);
                const blocoAzulV08 = this.blocosAzuis.create(500, 157, `blocoAzulVDE`).setSize(2, 85);
                const blocoAzulV09 = this.blocosAzuis.create(500, 257, `blocoAzulVDE`).setSize(2, 85);
                const blocoAzulV10 = this.blocosAzuis.create(500, 357, `blocoAzulVDE`).setSize(2, 85);
                const blocoAzulV11 = this.blocosAzuis.create(500, 457, `blocoAzulVDE`).setSize(2, 85);
                const blocoAzulV12 = this.blocosAzuis.create(600, 157, `blocoAzulVDE`).setSize(2, 85);
                const blocoAzulV13 = this.blocosAzuis.create(600, 357, `blocoAzulVDE`).setSize(2, 85);
                const blocoAzulV14 = this.blocosAzuis.create(700, 557, `blocoAzulVDE`).setSize(2, 85);
                const blocoAzulV15 = this.blocosAzuis.create(700, 357, `blocoAzulVDE`).setSize(2, 85);
                const blocoAzulV16 = this.blocosAzuis.create(600, 57, `blocoAzulVDE`).setSize(2, 85);

                // Blocos azuis horizontais do modo daltônico em inglês
                const blocoAzulH11 = this.blocosAzuis.create(250, 408, `blocoAzulHDE`).setSize(85, 2);
                const blocoAzulH01 = this.blocosAzuis.create(150, 108, `blocoAzulHDE`).setSize(85, 2);
                const blocoAzulH02 = this.blocosAzuis.create(250, 508, `blocoAzulHDE`).setSize(85, 2);
                const blocoAzulH03 = this.blocosAzuis.create(350, 408, `blocoAzulHDE`).setSize(85, 2);
                const blocoAzulH04 = this.blocosAzuis.create(450, 108, `blocoAzulHDE`).setSize(85, 2);
                const blocoAzulH05 = this.blocosAzuis.create(550, 508, `blocoAzulHDE`).setSize(85, 2);
                const blocoAzulH06 = this.blocosAzuis.create(650, 208, `blocoAzulHDE`).setSize(85, 2);
                const blocoAzulH07 = this.blocosAzuis.create(650, 408, `blocoAzulHDE`).setSize(85, 2);
                const blocoAzulH08 = this.blocosAzuis.create(750, 308, `blocoAzulHDE`).setSize(85, 2);
                const blocoAzulH09 = this.blocosAzuis.create(750, 108, `blocoAzulHDE`).setSize(85, 2);
                const blocoAzulH10 = this.blocosAzuis.create(350, 108, `blocoAzulHDE`).setSize(85, 2);

            }

        } else {

            // Blocos azuis verticais
            const blocoAzulV01 = this.blocosAzuis.create(100, 557, `blocoAzulV`).setSize(2, 85);
            const blocoAzulV02 = this.blocosAzuis.create(200, 157, `blocoAzulV`).setSize(2, 85);
            const blocoAzulV03 = this.blocosAzuis.create(200, 357, `blocoAzulV`).setSize(2, 85);
            const blocoAzulv04 = this.blocosAzuis.create(300, 157, `blocoAzulV`).setSize(2, 85);
            const blocoAzulV05 = this.blocosAzuis.create(300, 257, `blocoAzulV`).setSize(2, 85);
            const blocoAzulV08 = this.blocosAzuis.create(500, 157, `blocoAzulV`).setSize(2, 85);
            const blocoAzulV09 = this.blocosAzuis.create(500, 257, `blocoAzulV`).setSize(2, 85);
            const blocoAzulV10 = this.blocosAzuis.create(500, 357, `blocoAzulV`).setSize(2, 85);
            const blocoAzulV11 = this.blocosAzuis.create(500, 457, `blocoAzulV`).setSize(2, 85);
            const blocoAzulV12 = this.blocosAzuis.create(600, 157, `blocoAzulV`).setSize(2, 85);
            const blocoAzulV13 = this.blocosAzuis.create(600, 357, `blocoAzulV`).setSize(2, 85);
            const blocoAzulV14 = this.blocosAzuis.create(700, 557, `blocoAzulV`).setSize(2, 85);
            const blocoAzulV15 = this.blocosAzuis.create(700, 357, `blocoAzulV`).setSize(2, 85);
            const blocoAzulV16 = this.blocosAzuis.create(600, 57, `blocoAzulV`).setSize(2, 85);

            // Blocos azuis horizontais
            const blocoAzulH11 = this.blocosAzuis.create(250, 408, `blocoAzulH`).setSize(85, 2);
            const blocoAzulH01 = this.blocosAzuis.create(150, 108, `blocoAzulH`).setSize(85, 2);
            const blocoAzulH02 = this.blocosAzuis.create(250, 508, `blocoAzulH`).setSize(85, 2);
            const blocoAzulH03 = this.blocosAzuis.create(350, 408, `blocoAzulH`).setSize(85, 2);
            const blocoAzulH04 = this.blocosAzuis.create(450, 108, `blocoAzulH`).setSize(85, 2);
            const blocoAzulH05 = this.blocosAzuis.create(550, 508, `blocoAzulH`).setSize(85, 2);
            const blocoAzulH06 = this.blocosAzuis.create(650, 208, `blocoAzulH`).setSize(85, 2);
            const blocoAzulH07 = this.blocosAzuis.create(650, 408, `blocoAzulH`).setSize(85, 2);
            const blocoAzulH08 = this.blocosAzuis.create(750, 308, `blocoAzulH`).setSize(85, 2);
            const blocoAzulH09 = this.blocosAzuis.create(750, 108, `blocoAzulH`).setSize(85, 2);
            const blocoAzulH10 = this.blocosAzuis.create(350, 108, `blocoAzulH`).setSize(85, 2);

        }

    }

    passouPeloAzul() {

        setTimeout(() => {

            // Lógica para trocar os sons dos blocos azuis
            if (!this.azulSom2.isPlaying && !this.pAz) {

                this.azulSom.play();
                this.azulSom2.stop();
                this.vermelhoSom.stop();
                this.vermelhoSom2.stop();
                this.amareloSom.stop();
                this.amareloSom2.stop();

                this.pAz = true;

            } else if (!this.azulSom.isPlaying && this.pAz) {

                this.azulSom2.play();
                this.azulSom.stop();
                this.vermelhoSom.stop();
                this.vermelhoSom2.stop();
                this.amareloSom.stop();
                this.amareloSom2.stop();

                this.pAz = false;

            }

            // Prossegue a lógica do jogo
            this.azul = false;
            this.vermelho = true;
            this.amarelo = false;

            // Ativa os blocos amarelos chatos
            this.adicionarBlocosAmarelosChatos();

            // Adiciona um passo dado ao jogador
            this.passos++;
            this.passosDados.innerHTML = this.passos;

        }, 225);

    }

    criarBlocosVermelhos() {

        // Grupo de blocos vermelhos
        this.blocosVermelhos = this.physics.add.staticGroup();

        // Colisão do jogador com blocos vermelhos
        this.physics.add.overlap(this.jogador, this.blocosVermelhos, () => {

            if (this.vermelho) {

                this.passouPeloVermelho();

            } else {

                this.errouOrdemDasCores(`vermelho`);

            }

        });

        if (this.dalt.checked) {

            if (this.pt.checked) {

                // Blocos vermelhos verticais do modo daltônico
                const blocoVermelhoV04 = this.blocosVermelhos.create(300, 457, `blocoVermelhoVD`).setSize(2, 85);
                const blocoVermelhoV05 = this.blocosVermelhos.create(300, 557, `blocoVermelhoVD`).setSize(2, 85);
                const blocoVermelhoV07 = this.blocosVermelhos.create(400, 257, `blocoVermelhoVD`).setSize(2, 85);
                const blocoVermelhoV08 = this.blocosVermelhos.create(400, 357, `blocoVermelhoVD`).setSize(2, 85);
                const blocoVermelhoV10 = this.blocosVermelhos.create(600, 457, `blocoVermelhoVD`).setSize(2, 85);
                const blocoVermelhoV11 = this.blocosVermelhos.create(700, 457, `blocoVermelhoVD`).setSize(2, 85);
                const blocoVermelhoV12 = this.blocosVermelhos.create(700, 257, `blocoVermelhoVD`).setSize(2, 85);
                const blocoVermelhoV13 = this.blocosVermelhos.create(400, 57, `blocoVermelhoVD`).setSize(2, 85);
                const blocoVermelhoV14 = this.blocosVermelhos.create(700, 57, `blocoVermelhoVD`).setSize(2, 85);

                // Blocos vermelhos horizontais do modo daltônico
                const blocoVermelhoH17 = this.blocosVermelhos.create(350, 308, `blocoVermelhoHD`).setSize(85, 2);
                const blocoVermelhoH16 = this.blocosVermelhos.create(150, 208, `blocoVermelhoHD`).setSize(85, 2);
                const blocoVermelhoH15 = this.blocosVermelhos.create(250, 108, `blocoVermelhoHD`).setSize(85, 2);
                const blocoVermelhoH08 = this.blocosVermelhos.create(550, 108, `blocoVermelhoHD`).setSize(85, 2);
                const blocoVermelhoH05 = this.blocosVermelhos.create(250, 208, `blocoVermelhoHD`).setSize(85, 2);
                const blocoVermelhoH04 = this.blocosVermelhos.create(350, 208, `blocoVermelhoHD`).setSize(85, 2);
                const blocoVermelhoH09 = this.blocosVermelhos.create(550, 208, `blocoVermelhoHD`).setSize(85, 2);
                const blocoVermelhoH06 = this.blocosVermelhos.create(450, 308, `blocoVermelhoHD`).setSize(85, 2);
                const blocoVermelhoH11 = this.blocosVermelhos.create(650, 308, `blocoVermelhoHD`).setSize(85, 2);
                const blocoVermelhoH10 = this.blocosVermelhos.create(550, 408, `blocoVermelhoHD`).setSize(85, 2);
                const blocoVermelhoH01 = this.blocosVermelhos.create(150, 508, `blocoVermelhoHD`).setSize(85, 2);
                const blocoVermelhoH07 = this.blocosVermelhos.create(450, 508, `blocoVermelhoHD`).setSize(85, 2);
                const blocoVermelhoH12 = this.blocosVermelhos.create(750, 508, `blocoVermelhoHD`).setSize(85, 2);
                const blocoVermelhoH13 = this.blocosVermelhos.create(750, 208, `blocoVermelhoHD`).setSize(85, 2);
                const blocoVermelhoH14 = this.blocosVermelhos.create(450, 208, `blocoVermelhoHD`).setSize(85, 2);

            } else if (this.en.checked) {

                // Blocos vermelhos verticais do modo daltônico em inglês
                const blocoVermelhoV04 = this.blocosVermelhos.create(300, 457, `blocoVermelhoVDE`).setSize(2, 85);
                const blocoVermelhoV05 = this.blocosVermelhos.create(300, 557, `blocoVermelhoVDE`).setSize(2, 85);
                const blocoVermelhoV07 = this.blocosVermelhos.create(400, 257, `blocoVermelhoVDE`).setSize(2, 85);
                const blocoVermelhoV08 = this.blocosVermelhos.create(400, 357, `blocoVermelhoVDE`).setSize(2, 85);
                const blocoVermelhoV10 = this.blocosVermelhos.create(600, 457, `blocoVermelhoVDE`).setSize(2, 85);
                const blocoVermelhoV11 = this.blocosVermelhos.create(700, 457, `blocoVermelhoVDE`).setSize(2, 85);
                const blocoVermelhoV12 = this.blocosVermelhos.create(700, 257, `blocoVermelhoVDE`).setSize(2, 85);
                const blocoVermelhoV13 = this.blocosVermelhos.create(400, 57, `blocoVermelhoVDE`).setSize(2, 85);
                const blocoVermelhoV14 = this.blocosVermelhos.create(700, 57, `blocoVermelhoVDE`).setSize(2, 85);

                // Blocos vermelhos horizontais do modo daltônico em inglês
                const blocoVermelhoH17 = this.blocosVermelhos.create(350, 308, `blocoVermelhoHDE`).setSize(85, 2);
                const blocoVermelhoH16 = this.blocosVermelhos.create(150, 208, `blocoVermelhoHDE`).setSize(85, 2);
                const blocoVermelhoH15 = this.blocosVermelhos.create(250, 108, `blocoVermelhoHDE`).setSize(85, 2);
                const blocoVermelhoH08 = this.blocosVermelhos.create(550, 108, `blocoVermelhoHDE`).setSize(85, 2);
                const blocoVermelhoH05 = this.blocosVermelhos.create(250, 208, `blocoVermelhoHDE`).setSize(85, 2);
                const blocoVermelhoH04 = this.blocosVermelhos.create(350, 208, `blocoVermelhoHDE`).setSize(85, 2);
                const blocoVermelhoH09 = this.blocosVermelhos.create(550, 208, `blocoVermelhoHDE`).setSize(85, 2);
                const blocoVermelhoH06 = this.blocosVermelhos.create(450, 308, `blocoVermelhoHDE`).setSize(85, 2);
                const blocoVermelhoH11 = this.blocosVermelhos.create(650, 308, `blocoVermelhoHDE`).setSize(85, 2);
                const blocoVermelhoH10 = this.blocosVermelhos.create(550, 408, `blocoVermelhoHDE`).setSize(85, 2);
                const blocoVermelhoH01 = this.blocosVermelhos.create(150, 508, `blocoVermelhoHDE`).setSize(85, 2);
                const blocoVermelhoH07 = this.blocosVermelhos.create(450, 508, `blocoVermelhoHDE`).setSize(85, 2);
                const blocoVermelhoH12 = this.blocosVermelhos.create(750, 508, `blocoVermelhoHDE`).setSize(85, 2);
                const blocoVermelhoH13 = this.blocosVermelhos.create(750, 208, `blocoVermelhoHDE`).setSize(85, 2);
                const blocoVermelhoH14 = this.blocosVermelhos.create(450, 208, `blocoVermelhoHDE`).setSize(85, 2);

            }

        } else {

            // Blocos vermelhos verticais
            const blocoVermelhoV04 = this.blocosVermelhos.create(300, 457, `blocoVermelhoV`).setSize(2, 85);
            const blocoVermelhoV05 = this.blocosVermelhos.create(300, 557, `blocoVermelhoV`).setSize(2, 85);
            const blocoVermelhoV07 = this.blocosVermelhos.create(400, 257, `blocoVermelhoV`).setSize(2, 85);
            const blocoVermelhoV08 = this.blocosVermelhos.create(400, 357, `blocoVermelhoV`).setSize(2, 85);
            const blocoVermelhoV10 = this.blocosVermelhos.create(600, 457, `blocoVermelhoV`).setSize(2, 85);
            const blocoVermelhoV11 = this.blocosVermelhos.create(700, 457, `blocoVermelhoV`).setSize(2, 85);
            const blocoVermelhoV12 = this.blocosVermelhos.create(700, 257, `blocoVermelhoV`).setSize(2, 85);
            const blocoVermelhoV13 = this.blocosVermelhos.create(400, 57, `blocoVermelhoV`).setSize(2, 85);
            const blocoVermelhoV14 = this.blocosVermelhos.create(700, 57, `blocoVermelhoV`).setSize(2, 85);

            // Blocos vermelhos horizontais
            const blocoVermelhoH17 = this.blocosVermelhos.create(350, 308, `blocoVermelhoH`).setSize(85, 2);
            const blocoVermelhoH16 = this.blocosVermelhos.create(150, 208, `blocoVermelhoH`).setSize(85, 2);
            const blocoVermelhoH15 = this.blocosVermelhos.create(250, 108, `blocoVermelhoH`).setSize(85, 2);
            const blocoVermelhoH08 = this.blocosVermelhos.create(550, 108, `blocoVermelhoH`).setSize(85, 2);
            const blocoVermelhoH05 = this.blocosVermelhos.create(250, 208, `blocoVermelhoH`).setSize(85, 2);
            const blocoVermelhoH04 = this.blocosVermelhos.create(350, 208, `blocoVermelhoH`).setSize(85, 2);
            const blocoVermelhoH09 = this.blocosVermelhos.create(550, 208, `blocoVermelhoH`).setSize(85, 2);
            const blocoVermelhoH06 = this.blocosVermelhos.create(450, 308, `blocoVermelhoH`).setSize(85, 2);
            const blocoVermelhoH11 = this.blocosVermelhos.create(650, 308, `blocoVermelhoH`).setSize(85, 2);
            const blocoVermelhoH10 = this.blocosVermelhos.create(550, 408, `blocoVermelhoH`).setSize(85, 2);
            const blocoVermelhoH01 = this.blocosVermelhos.create(150, 508, `blocoVermelhoH`).setSize(85, 2);
            const blocoVermelhoH07 = this.blocosVermelhos.create(450, 508, `blocoVermelhoH`).setSize(85, 2);
            const blocoVermelhoH12 = this.blocosVermelhos.create(750, 508, `blocoVermelhoH`).setSize(85, 2);
            const blocoVermelhoH13 = this.blocosVermelhos.create(750, 208, `blocoVermelhoH`).setSize(85, 2);
            const blocoVermelhoH14 = this.blocosVermelhos.create(450, 208, `blocoVermelhoH`).setSize(85, 2);

        }

    }

    passouPeloVermelho() {

        setTimeout(() => {

            // Lógica para trocar os sons dos blocos vermelhos
            if (!this.vermelhoSom2.isPlaying && !this.pVe) {

                this.vermelhoSom.play();
                this.vermelhoSom2.stop();
                this.azulSom.stop();
                this.azulSom2.stop();
                this.amareloSom.stop();
                this.amareloSom2.stop();

                this.pVe = true;

            } else if (!this.vermelhoSom.isPlaying && this.pVe) {

                this.vermelhoSom2.play();
                this.vermelhoSom.stop();
                this.azulSom.stop();
                this.azulSom2.stop();
                this.amareloSom.stop();
                this.amareloSom2.stop();

                this.pVe = false;

            }

            // Prossegue a lógica do jogo
            this.azul = false;
            this.vermelho = false;
            this.amarelo = true;

            // Desativa os blocos amarelos chatos
            this.removerBlocosAmarelosChatos();

            // Adiciona um passo dado ao jogador
            this.passos++;
            this.passosDados.innerHTML = this.passos;

        }, 225);

    }

    criarBlocosAmarelos() {

        // Grupo de blocos amarelos
        this.blocosAmarelos = this.physics.add.staticGroup();

        // Colisão do jogador com blocos amarelos
        this.physics.add.overlap(this.jogador, this.blocosAmarelos, () => {

            if (this.amarelo) {

                this.passouPeloAmarelo();

            } else {

                this.errouOrdemDasCores(`amarelo`);

            }

        });

        if (this.dalt.checked) {

            if (this.pt.checked) {

                // Blocos amarelos verticais do modo daltônico
                const blocoAmareloV15 = this.blocosAmarelos.create(400, 457, `blocoAmareloVD`).setSize(2, 85);
                const blocoAmareloV14 = this.blocosAmarelos.create(300, 357, `blocoAmareloVD`).setSize(2, 85);
                const blocoAmareloV13 = this.blocosAmarelos.create(200, 257, `blocoAmareloVD`).setSize(2, 85);
                const blocoAmareloV12 = this.blocosAmarelos.create(200, 57, `blocoAmareloVD`).setSize(2, 85);
                const blocoAmareloV01 = this.blocosAmarelos.create(200, 457, `blocoAmareloVD`).setSize(2, 85);
                const blocoAmareloV02 = this.blocosAmarelos.create(200, 557, `blocoAmareloVD`).setSize(2, 85);
                const blocoAmareloV03 = this.blocosAmarelos.create(300, 57, `blocoAmareloVD`).setSize(2, 85);
                const blocoAmareloV05 = this.blocosAmarelos.create(400, 557, `blocoAmareloVD`).setSize(2, 85);
                const blocoAmareloV06 = this.blocosAmarelos.create(500, 557, `blocoAmareloVD`).setSize(2, 85);
                const blocoAmareloV07 = this.blocosAmarelos.create(600, 257, `blocoAmareloVD`).setSize(2, 85);
                const blocoAmareloV08 = this.blocosAmarelos.create(600, 557, `blocoAmareloVD`).setSize(2, 85);
                const blocoAmareloV09 = this.blocosAmarelos.create(700, 157, `blocoAmareloVD`).setSize(2, 85);
                const blocoAmareloV10 = this.blocosAmarelos.create(400, 157, `blocoAmareloVD`).setSize(2, 85);
                const blocoAmareloV11 = this.blocosAmarelos.create(500, 57, `blocoAmareloVD`).setSize(2, 85);

                // Blocos amarelos horizontais do modo daltônico
                const blocoAmareloH02 = this.blocosAmarelos.create(650, 108, `blocoAmareloHD`).setSize(85, 2);
                const blocoAmareloH05 = this.blocosAmarelos.create(150, 308, `blocoAmareloHD`).setSize(85, 2);
                const blocoAmareloH06 = this.blocosAmarelos.create(250, 308, `blocoAmareloHD`).setSize(85, 2);
                const blocoAmareloH08 = this.blocosAmarelos.create(550, 308, `blocoAmareloHD`).setSize(85, 2);
                const blocoAmareloH09 = this.blocosAmarelos.create(150, 408, `blocoAmareloHD`).setSize(85, 2);
                const blocoAmareloH10 = this.blocosAmarelos.create(450, 408, `blocoAmareloHD`).setSize(85, 2);
                const blocoAmareloH11 = this.blocosAmarelos.create(350, 508, `blocoAmareloHD`).setSize(85, 2);
                const blocoAmareloH12 = this.blocosAmarelos.create(650, 508, `blocoAmareloHD`).setSize(85, 2);
                const blocoAmareloH13 = this.blocosAmarelos.create(750, 408, `blocoAmareloHD`).setSize(85, 2);

            } else if (this.en.checked) {

                // Blocos amarelos verticais do modo daltônico em inglês
                const blocoAmareloV15 = this.blocosAmarelos.create(400, 457, `blocoAmareloVDE`).setSize(2, 85);
                const blocoAmareloV14 = this.blocosAmarelos.create(300, 357, `blocoAmareloVDE`).setSize(2, 85);
                const blocoAmareloV13 = this.blocosAmarelos.create(200, 257, `blocoAmareloVDE`).setSize(2, 85);
                const blocoAmareloV12 = this.blocosAmarelos.create(200, 57, `blocoAmareloVDE`).setSize(2, 85);
                const blocoAmareloV01 = this.blocosAmarelos.create(200, 457, `blocoAmareloVDE`).setSize(2, 85);
                const blocoAmareloV02 = this.blocosAmarelos.create(200, 557, `blocoAmareloVDE`).setSize(2, 85);
                const blocoAmareloV03 = this.blocosAmarelos.create(300, 57, `blocoAmareloVDE`).setSize(2, 85);
                const blocoAmareloV05 = this.blocosAmarelos.create(400, 557, `blocoAmareloVDE`).setSize(2, 85);
                const blocoAmareloV06 = this.blocosAmarelos.create(500, 557, `blocoAmareloVDE`).setSize(2, 85);
                const blocoAmareloV07 = this.blocosAmarelos.create(600, 257, `blocoAmareloVDE`).setSize(2, 85);
                const blocoAmareloV08 = this.blocosAmarelos.create(600, 557, `blocoAmareloVDE`).setSize(2, 85);
                const blocoAmareloV09 = this.blocosAmarelos.create(700, 157, `blocoAmareloVDE`).setSize(2, 85);
                const blocoAmareloV10 = this.blocosAmarelos.create(400, 157, `blocoAmareloVDE`).setSize(2, 85);
                const blocoAmareloV11 = this.blocosAmarelos.create(500, 57, `blocoAmareloVDE`).setSize(2, 85);

                // Blocos amarelos horizontais do modo daltônico em inglês
                const blocoAmareloH02 = this.blocosAmarelos.create(650, 108, `blocoAmareloHDE`).setSize(85, 2);
                const blocoAmareloH05 = this.blocosAmarelos.create(150, 308, `blocoAmareloHDE`).setSize(85, 2);
                const blocoAmareloH06 = this.blocosAmarelos.create(250, 308, `blocoAmareloHDE`).setSize(85, 2);
                const blocoAmareloH08 = this.blocosAmarelos.create(550, 308, `blocoAmareloHDE`).setSize(85, 2);
                const blocoAmareloH09 = this.blocosAmarelos.create(150, 408, `blocoAmareloHDE`).setSize(85, 2);
                const blocoAmareloH10 = this.blocosAmarelos.create(450, 408, `blocoAmareloHDE`).setSize(85, 2);
                const blocoAmareloH11 = this.blocosAmarelos.create(350, 508, `blocoAmareloHDE`).setSize(85, 2);
                const blocoAmareloH12 = this.blocosAmarelos.create(650, 508, `blocoAmareloHDE`).setSize(85, 2);
                const blocoAmareloH13 = this.blocosAmarelos.create(750, 408, `blocoAmareloHDE`).setSize(85, 2);

            }

        } else {

            // Blocos amarelos verticais
            const blocoAmareloV15 = this.blocosAmarelos.create(400, 457, `blocoAmareloV`).setSize(2, 85);
            const blocoAmareloV14 = this.blocosAmarelos.create(300, 357, `blocoAmareloV`).setSize(2, 85);
            const blocoAmareloV13 = this.blocosAmarelos.create(200, 257, `blocoAmareloV`).setSize(2, 85);
            const blocoAmareloV12 = this.blocosAmarelos.create(200, 57, `blocoAmareloV`).setSize(2, 85);
            const blocoAmareloV01 = this.blocosAmarelos.create(200, 457, `blocoAmareloV`).setSize(2, 85);
            const blocoAmareloV02 = this.blocosAmarelos.create(200, 557, `blocoAmareloV`).setSize(2, 85);
            const blocoAmareloV03 = this.blocosAmarelos.create(300, 57, `blocoAmareloV`).setSize(2, 85);
            const blocoAmareloV05 = this.blocosAmarelos.create(400, 557, `blocoAmareloV`).setSize(2, 85);
            const blocoAmareloV06 = this.blocosAmarelos.create(500, 557, `blocoAmareloV`).setSize(2, 85);
            const blocoAmareloV07 = this.blocosAmarelos.create(600, 257, `blocoAmareloV`).setSize(2, 85);
            const blocoAmareloV08 = this.blocosAmarelos.create(600, 557, `blocoAmareloV`).setSize(2, 85);
            const blocoAmareloV09 = this.blocosAmarelos.create(700, 157, `blocoAmareloV`).setSize(2, 85);
            const blocoAmareloV10 = this.blocosAmarelos.create(400, 157, `blocoAmareloV`).setSize(2, 85);
            const blocoAmareloV11 = this.blocosAmarelos.create(500, 57, `blocoAmareloV`).setSize(2, 85);

            // Blocos amarelos horizontais
            const blocoAmareloH02 = this.blocosAmarelos.create(650, 108, `blocoAmareloH`).setSize(85, 2);
            const blocoAmareloH05 = this.blocosAmarelos.create(150, 308, `blocoAmareloH`).setSize(85, 2);
            const blocoAmareloH06 = this.blocosAmarelos.create(250, 308, `blocoAmareloH`).setSize(85, 2);
            const blocoAmareloH08 = this.blocosAmarelos.create(550, 308, `blocoAmareloH`).setSize(85, 2);
            const blocoAmareloH09 = this.blocosAmarelos.create(150, 408, `blocoAmareloH`).setSize(85, 2);
            const blocoAmareloH10 = this.blocosAmarelos.create(450, 408, `blocoAmareloH`).setSize(85, 2);
            const blocoAmareloH11 = this.blocosAmarelos.create(350, 508, `blocoAmareloH`).setSize(85, 2);
            const blocoAmareloH12 = this.blocosAmarelos.create(650, 508, `blocoAmareloH`).setSize(85, 2);
            const blocoAmareloH13 = this.blocosAmarelos.create(750, 408, `blocoAmareloH`).setSize(85, 2);

        }

    }

    passouPeloAmarelo() {

        setTimeout(() => {

            // Lógica para trocar os sons dos blocos amarelos
            if (!this.amareloSom2.isPlaying && !this.pAm) {

                this.amareloSom.play();
                this.amareloSom2.stop();
                this.azulSom.stop();
                this.azulSom2.stop();
                this.vermelhoSom.stop();
                this.vermelhoSom2.stop();

                this.pAm = true;

            } else if (!this.amareloSom.isPlaying && this.pAm) {

                this.amareloSom2.play();
                this.amareloSom.stop();
                this.azulSom.stop();
                this.azulSom2.stop();
                this.vermelhoSom.stop();
                this.vermelhoSom2.stop();

                this.pAm = false;

            }

            // Prossegue a lógica do jogo
            this.azul = true;
            this.vermelho = false;
            this.amarelo = false;

            // Ativa os blocos amarelos chatos
            this.adicionarBlocosAmarelosChatos();

            // Adiciona um passo dado ao jogador
            this.passos++;
            this.passosDados.innerHTML = this.passos;

        }, 225);

    }

    criarBlocosLilas() {

        // Grupo de blocos lilás
        this.blocosLilas = this.physics.add.staticGroup();

        // Bloco lilás 01
        this.blocoLilas01 = this.blocosLilas.create(100, 357, `blocoLilasV`);

        // Bloco lilás 02
        this.blocoLilas02 = this.blocosLilas.create(800, 257, `blocoLilasV`);

        if (this.pt.checked && this.dalt.checked) {

            // Bloco lilás01 do modo daltônico
            this.blocoLilas01 = this.blocosLilas.create(100, 357, `blocoLilasVD`);

            // Bloco lilás02 do modo daltônico
            this.blocoLilas02 = this.blocosLilas.create(800, 257, `blocoLilasVD`);

        } else if (this.en.checked && this.dalt.checked) {

            // Bloco lilás01 do modo daltônico em inglês
            this.blocoLilas01 = this.blocosLilas.create(100, 357, `blocoLilasVDE`);

            // Bloco lilás02 do modo daltônico em inglês
            this.blocoLilas02 = this.blocosLilas.create(800, 257, `blocoLilasVDE`);

        }

        // Colisão com o bloco lilás 01
        this.physics.add.collider(this.jogador, this.blocoLilas01, () => {

            setTimeout(() => {

                this.tocouBlocoLilas(1);

            }, 450);

        });

        // Colisão com bloco lilás 02
        this.physics.add.collider(this.jogador, this.blocoLilas02, () => {

            setTimeout(() => {

                this.tocouBlocoLilas(2);

            }, 450);

        });

    }

    tocouBlocoLilas(numBloco) {

        // Som do bloco lilás
        const tocouLilas = new Audio(`./assets/sons/lilasSom.ogg`);
        tocouLilas.play();

        if (numBloco == 1) {

            // Reposiciona o jogador
            this.jogador.x = 765;
            this.jogador.y = 265;

        }

        if (numBloco == 2) {

            // Reposiciona o jogador
            this.jogador.x = 135;
            this.jogador.y = 365;

        }

        // Para todos os sons
        this.amareloSom2.stop();
        this.amareloSom.stop();
        this.azulSom.stop();
        this.azulSom2.stop();
        this.vermelhoSom.stop();
        this.vermelhoSom2.stop();

    }

    criarBlocosAmarelosChatos() {

        // Blocos amarelos chatos
        this.blocosAmarelosChatos = this.physics.add.staticGroup();
        this.physics.add.collider(this.jogador, this.blocosAmarelosChatos);

        // Blocos amarelos chatos verticais
        this.blocoAmareloV15 = this.blocosAmarelosChatos.create(400, 457, `blocoTransparenteV`);
        this.blocoAmareloV14 = this.blocosAmarelosChatos.create(300, 357, `blocoTransparenteV`);
        this.blocoAmareloV13 = this.blocosAmarelosChatos.create(200, 257, `blocoTransparenteV`);
        this.blocoAmareloV12 = this.blocosAmarelosChatos.create(200, 57, `blocoTransparenteV`)
        this.blocoAmareloV01 = this.blocosAmarelosChatos.create(200, 457, `blocoTransparenteV`);
        this.blocoAmareloV02 = this.blocosAmarelosChatos.create(200, 557, `blocoTransparenteV`);
        this.blocoAmareloV03 = this.blocosAmarelosChatos.create(300, 57, `blocoTransparenteV`);
        this.blocoAmareloV05 = this.blocosAmarelosChatos.create(400, 557, `blocoTransparenteV`);
        this.blocoAmareloV06 = this.blocosAmarelosChatos.create(500, 557, `blocoTransparenteV`);
        this.blocoAmareloV07 = this.blocosAmarelosChatos.create(600, 257, `blocoTransparenteV`);
        this.blocoAmareloV08 = this.blocosAmarelosChatos.create(600, 557, `blocoTransparenteV`);
        this.blocoAmareloV09 = this.blocosAmarelosChatos.create(700, 157, `blocoTransparenteV`);
        this.blocoAmareloV10 = this.blocosAmarelosChatos.create(400, 157, `blocoTransparenteV`);
        this.blocoAmareloV11 = this.blocosAmarelosChatos.create(500, 57, `blocoTransparenteV`);

        // Blocos amarelos chatos horizontais
        this.blocoAmareloH02 = this.blocosAmarelosChatos.create(650, 108, `blocoTransparenteH`);
        this.blocoAmareloH05 = this.blocosAmarelosChatos.create(150, 308, `blocoTransparenteH`);
        this.blocoAmareloH06 = this.blocosAmarelosChatos.create(250, 308, `blocoTransparenteH`);
        this.blocoAmareloH08 = this.blocosAmarelosChatos.create(550, 308, `blocoTransparenteH`);
        this.blocoAmareloH09 = this.blocosAmarelosChatos.create(150, 408, `blocoTransparenteH`);
        this.blocoAmareloH10 = this.blocosAmarelosChatos.create(450, 408, `blocoTransparenteH`);
        this.blocoAmareloH11 = this.blocosAmarelosChatos.create(350, 508, `blocoTransparenteH`);
        this.blocoAmareloH12 = this.blocosAmarelosChatos.create(650, 508, `blocoTransparenteH`);
        this.blocoAmareloH13 = this.blocosAmarelosChatos.create(750, 408, `blocoTransparenteH`);

    }

    adicionarBlocosAmarelosChatos() {

        this.blocoAmareloV15.enableBody();
        this.blocoAmareloV14.enableBody();
        this.blocoAmareloV13.enableBody();
        this.blocoAmareloV12.enableBody();
        this.blocoAmareloV01.enableBody();
        this.blocoAmareloV02.enableBody();
        this.blocoAmareloV03.enableBody();
        this.blocoAmareloV05.enableBody();
        this.blocoAmareloV06.enableBody();
        this.blocoAmareloV07.enableBody();
        this.blocoAmareloV08.enableBody();
        this.blocoAmareloV09.enableBody();
        this.blocoAmareloV10.enableBody();
        this.blocoAmareloV11.enableBody();

        this.blocoAmareloH02.enableBody();
        this.blocoAmareloH05.enableBody();
        this.blocoAmareloH06.enableBody();
        this.blocoAmareloH08.enableBody();
        this.blocoAmareloH09.enableBody();
        this.blocoAmareloH10.enableBody();
        this.blocoAmareloH11.enableBody();
        this.blocoAmareloH12.enableBody();
        this.blocoAmareloH13.enableBody();

    }

    removerBlocosAmarelosChatos() {

        this.blocoAmareloV15.disableBody();
        this.blocoAmareloV14.disableBody();
        this.blocoAmareloV13.disableBody();
        this.blocoAmareloV12.disableBody();
        this.blocoAmareloV01.disableBody();
        this.blocoAmareloV02.disableBody();
        this.blocoAmareloV03.disableBody();
        this.blocoAmareloV05.disableBody();
        this.blocoAmareloV06.disableBody();
        this.blocoAmareloV07.disableBody();
        this.blocoAmareloV08.disableBody();
        this.blocoAmareloV09.disableBody();
        this.blocoAmareloV10.disableBody();
        this.blocoAmareloV11.disableBody();

        this.blocoAmareloH02.disableBody();
        this.blocoAmareloH05.disableBody();
        this.blocoAmareloH06.disableBody();
        this.blocoAmareloH08.disableBody();
        this.blocoAmareloH09.disableBody();
        this.blocoAmareloH10.disableBody();
        this.blocoAmareloH11.disableBody();
        this.blocoAmareloH12.disableBody();
        this.blocoAmareloH13.disableBody();

    }

    criarBlocosCinzasChatos() {

        // Blocos cinzas ao redor do troféu
        this.blocoCinzaChato01 = this.blocosCinzas.create(750, 108, `blocoCinzaH`);
        this.blocoCinzaChato02 = this.blocosCinzas.create(700, 57, `blocoCinzaV`);

        // Blocos cinzas ao redor da segunda chave
        this.blocoCinzaChato03 = this.blocosCinzas.create(150, 108, `blocoCinzaH`);
        this.blocoCinzaChato04 = this.blocosCinzas.create(200, 57, `blocoCinzaV`);

        // Blocos cinzas sobre os blocos lilás
        this.blocoCinzaChato05 = this.blocosCinzas.create(800, 257, `blocoCinzaV`);
        this.blocoCinzaChato06 = this.blocosCinzas.create(100, 357, `blocoCinzaV`);

    }

    criarBlocosMarrons() {

        // Blocos marrons
        this.blocosMarrons = this.physics.add.staticGroup({

            key: 'blocoMarrom',
            frame: [0, 1, 2, 3, 4, 5, 6],
            frameQuantity: 8,

        });

        Phaser.Actions.GridAlign(this.blocosMarrons.getChildren(), {

            height: 7,
            width: 8,
            cellWidth: 100,
            cellHeight: 100,
            x: 142,
            y: 50

        });

        this.physics.add.collider(this.jogador, this.blocosMarrons);

        this.add.image(8, 608, `blocoMarrom`);
        this.add.image(8, 508, `blocoMarrom`);

    }

    criarCoracoes() {

        // Grupo de corações
        this.coras = this.physics.add.staticGroup();

        // Corações
        this.cora01 = this.coras.create(550, 160, `vidas`);
        this.cora02 = this.coras.create(250, 160, `vidas`);

        // Colisão do jogador com corações
        this.physics.add.overlap(this.jogador, this.cora01, () => {

            this.cora01.disableBody().setVisible(false, false);
            this.adicionarVida();

        });

        this.physics.add.overlap(this.jogador, this.cora02, () => {

            this.cora02.disableBody().setVisible(false, false);
            this.adicionarVida();

        });

    }

    criarQuestoes() {

        // Grupo de questões
        this.questoes = this.physics.add.staticGroup();

        // Questões
        this.questao01 = this.questoes.create(650, 460, `questao`);
        this.questao02 = this.questoes.create(250, 260, `questao`);
        this.questao03 = this.questoes.create(350, 360, `questao`);
        this.questao04 = this.questoes.create(550, 360, `questao`);
        this.questao05 = this.questoes.create(750, 360, `questao`);
        this.questao06 = this.questoes.create(750, 160, `questao`);
        this.questao07 = this.questoes.create(650, 260, `questao`);
        this.questao08 = this.questoes.create(350, 160, `questao`);
        this.questao09 = this.questoes.create(450, 260, `questao`);

        // Som de colisão do jogador com questões
        this.physics.add.overlap(this.jogador, this.questoes, () => {

            this.qSom.play();

        });

        // Colisão do jogador com cada questão
        this.physics.add.overlap(this.jogador, this.questao01, () => {

            setTimeout(() => {

                this.questao01.disableBody().setVisible(false, false);
                this.esconderJogo(`q01`);

            }, 450);

        });

        this.physics.add.overlap(this.jogador, this.questao02, () => {

            setTimeout(() => {

                this.questao02.disableBody().setVisible(false, false);
                this.esconderJogo(`q02`);

            }, 450);

        });

        this.physics.add.overlap(this.jogador, this.questao03, () => {

            setTimeout(() => {

                this.questao03.disableBody().setVisible(false, false);
                this.esconderJogo(`q03`);

            }, 450);

        });

        this.physics.add.overlap(this.jogador, this.questao04, () => {

            setTimeout(() => {

                this.questao04.disableBody().setVisible(false, false);
                this.esconderJogo(`q04`);
            }, 450);

        });

        this.physics.add.overlap(this.jogador, this.questao05, () => {

            setTimeout(() => {

                this.questao05.disableBody().setVisible(false, false);
                this.esconderJogo(`q05`);
            }, 450);

        });

        this.physics.add.overlap(this.jogador, this.questao06, () => {

            setTimeout(() => {

                this.questao06.disableBody().setVisible(false, false);
                this.esconderJogo(`q06`);

            }, 450);

        });

        this.physics.add.overlap(this.jogador, this.questao07, () => {

            setTimeout(() => {

                this.questao07.disableBody().setVisible(false, false);
                this.esconderJogo(`q07`);
            }, 450);

        });

        this.physics.add.overlap(this.jogador, this.questao08, () => {

            setTimeout(() => {

                this.questao08.disableBody().setVisible(false, false);
                this.esconderJogo(`q08`)

            }, 450);

        });

        this.physics.add.overlap(this.jogador, this.questao09, () => {
            setTimeout(() => {

                this.questao09.disableBody().setVisible(false, false);
                this.esconderJogo(`q09`);

            }, 450);

        });

    }

    criarBotaoIniciar() {
        setTimeout(() => {
            console.log(`1`)
            this.acaoBotaoIniciar();
        }, 2750);
    }

    acaoBotaoIniciar() {

        // Se o jogo ainda não foi inicializado então
        if (!this.jogo) {

            // Para os sons do jogo
            this.sound.stopAll();

            // Inicia música do jogo
            this.musicaJogo.play();

            // Reinicia o cronômetro
            this.contaTempo.resetTimer();
            this.contaTempo.startTimer();

            // Reseta os passos do jogador
            this.passos = 0;
            this.passosDados.innerHTML = 0;

            // Mostra os corações, questões, cronômetro, chaves e contador de passos
            this.vidas.style.visibility = `visible`;
            this.vidas.style.paddingLeft = `0px`;

            this.qs.style.visibility = `visible`;
            this.qs.style.paddingLeft = `0px`;

            this.relogio.style.visibility = `visible`;
            this.relogio.style.paddingLeft = `0px`;

            this.contaPassos.style.visibility = `visible`;
            this.contaPassos.style.paddingLeft = `0px`;

            this.chaves.style.visibility = `visible`;
            this.chaves.style.paddingLeft = `0px`;

            // Reseta as chaves
            this.chaves01.className = `esconder`;
            this.chaves02.className = `esconder`;

            // Reseta os corações
            this.vida01.className = `esconder`;
            this.vida02.className = `esconder`;

            this.vida03.className = `mostrar`;
            this.vida04.className = `mostrar`;
            this.vida05.className = `mostrar`;

            // Reseta as questões
            this.qs01.className = `esconder`;
            this.qs02.className = `esconder`;
            this.qs03.className = `esconder`;
            this.qs04.className = `esconder`;
            this.qs05.className = `esconder`;
            this.qs06.className = `esconder`;
            this.qs07.className = `esconder`;
            this.qs08.className = `esconder`;
            this.qs09.className = `esconder`;

            // Inicia a lógica do jogo
            this.jogo = true;
            this.azul = true;

            // Mostra o jogador
            this.jogador.setVisible(true);

            // Reinicia o quiz do jogo
            document.getElementById("q01D").disabled = false;
            document.getElementById("q02C").disabled = false;
            document.getElementById("q03C").disabled = false;
            document.getElementById("q04E").disabled = false;
            document.getElementById("q05B").disabled = false;
            document.getElementById("q06B").disabled = false;
            document.getElementById("q07C").disabled = false;
            document.getElementById("q08E").disabled = false;
            document.getElementById("q09B").disabled = false;

        }

        // Inicia os movimentos do jogador
        this.iniciarMovimentos();

    }

    criarBotaoVoltar() {

        // Botão de voltar ao menu
        this.bVoltar = this.add.image(46, 30, `bVoltar01`).setScale(0.45, 0.65);
        this.bVoltar.setInteractive();

        // Ação de clikar no botão de voltar
        this.bVoltar.on(`pointerdown`, () => {
            this.bVoltar = this.add.image(46, 30, `bVoltar02`).setScale(0.45, 0.65);
            this.sound.play(`bSom`);

            setTimeout(() => {

                this.acaoBotaoVoltar();

            }, 450);

        }).on(`pointerup`, () => {

            this.bVoltar = this.add.image(46, 30, `bVoltar01`).setScale(0.45, 0.65);

        });
    }

    acaoBotaoVoltar() {

        // Para os sons do jogo
        this.sound.stopAll();

        // Tira da tela os corações, crônometro, contador de passos, chaves e questões coletadas
        this.vidas.style.paddingLeft = `10000px`;
        this.qs.style.paddingLeft = `10000px`;
        this.relogio.style.paddingLeft = `10000px`;
        this.contaPassos.style.paddingLeft = `10000px`;
        this.chaves.style.paddingLeft = `10000px`;

        // Para o movimento e sons do jogador
        this.jogo = false;

        // Reseta os passos do jogador
        this.passos = 0;
        this.passosDados.innerHTML = 0;

        // Reseta o crônometro
        this.contaTempo.stopTimer();
        this.contaTempo.resetTimer();

        // Animação de troca de tela
        setTimeout(() => {

            this.canvas.animate([{opacity: `0`, offset: 0}, {opacity: `1`, offset: 1}],
                975);

            this.scene.stop(`telaDoJogo`);
            this.scene.start(`telaDeInicio`);

        }, 125);

        // Reinicia o quiz do jogo
        document.getElementById("q01D").disabled = false;
        document.getElementById("q02C").disabled = false;
        document.getElementById("q03C").disabled = false;
        document.getElementById("q04E").disabled = false;
        document.getElementById("q05B").disabled = false;
        document.getElementById("q06B").disabled = false;
        document.getElementById("q07C").disabled = false;
        document.getElementById("q08E").disabled = false;
        document.getElementById("q09B").disabled = false;

    }

    criarBotaoReiniciar() {

        if (this.pt.checked) {

            // Botão de reiniciar o jogo
            this.bReiniciar = this.add.image(46, 72, `bReiniciar01`).setScale(0.45, 0.65);
            this.bReiniciar.setInteractive();

            // Ação de clikar no botão de reiniciar o jogo
            this.bReiniciar.on(`pointerdown`, () => {

                this.bReiniciar = this.add.image(46, 72, `bReiniciar02`).setScale(0.45, 0.65);
                this.sound.play(`bSom`);

                setTimeout(() => {

                    this.acaoBotaoReiniciar();

                }, 450);

            }).on(`pointerup`, () => {

                this.bReiniciar = this.add.image(46, 72, `bReiniciar01`).setScale(0.45, 0.65);

            });

        } else if (this.en.checked) {

            // Botão de reiniciar o jogo em inglês
            this.bReiniciar = this.add.image(46, 72, `bReiniciar01E`).setScale(0.45, 0.65);
            this.bReiniciar.setInteractive();

            // Ação de clikar no botão de reiniciar o jogo
            this.bReiniciar.on(`pointerdown`, () => {

                this.bReiniciar = this.add.image(46, 72, `bReiniciar02E`).setScale(0.45, 0.65);
                this.sound.play(`bSom`);

                setTimeout(() => {

                    this.acaoBotaoReiniciar();

                }, 450);

            }).on(`pointerup`, () => {

                this.bReiniciar = this.add.image(46, 72, `bReiniciar01E`).setScale(0.45, 0.65);

            });

        }

    }

    acaoBotaoReiniciar() {

        // Reinicia o cronômetro
        this.contaTempo.resetTimer();
        this.contaTempo.startTimer();

        // Reinicia a posição do jogador
        this.jogador.x = 45;
        this.jogador.y = 565;

        // Reinicia a lógica do jogo
        this.azul = true;
        this.vermelho = false;
        this.amarelo = false;

        // Reseta os passos do jogador
        this.passos = 0;
        this.passosDados.innerHTML = 0;

        // Reinicia os status do jogador
        this.vida01.className = `esconder`;
        this.vida02.className = `esconder`;

        this.vida03.className = `mostrar`;
        this.vida04.className = `mostrar`;
        this.vida05.className = `mostrar`;

        this.qs01.className = `esconder`;
        this.qs02.className = `esconder`;
        this.qs03.className = `esconder`;
        this.qs04.className = `esconder`;
        this.qs05.className = `esconder`;
        this.qs06.className = `esconder`;
        this.qs07.className = `esconder`;
        this.qs08.className = `esconder`;
        this.qs09.className = `esconder`;

        // Reinicia os objetivos do jogo
        this.chaves01.className = `esconder`;
        this.chaves02.className = `esconder`;

        this.chave01.enableBody().setVisible(true, true);
        this.chave02.enableBody().setVisible(true, true);

        this.cora01.enableBody().setVisible(true, true);
        this.cora02.enableBody().setVisible(true, true);

        this.blocoCinzaChato01.enableBody().setVisible(true, true);
        this.blocoCinzaChato02.enableBody().setVisible(true, true);
        this.blocoCinzaChato03.enableBody().setVisible(true, true);
        this.blocoCinzaChato04.enableBody().setVisible(true, true);
        this.blocoCinzaChato05.enableBody().setVisible(true, true);
        this.blocoCinzaChato06.enableBody().setVisible(true, true);

        this.questao01.enableBody().setVisible(true, true);
        this.questao02.enableBody().setVisible(true, true);
        this.questao03.enableBody().setVisible(true, true);
        this.questao04.enableBody().setVisible(true, true);
        this.questao05.enableBody().setVisible(true, true);
        this.questao06.enableBody().setVisible(true, true);
        this.questao07.enableBody().setVisible(true, true);
        this.questao08.enableBody().setVisible(true, true);
        this.questao09.enableBody().setVisible(true, true);

        // Reinicia o quiz do jogo
        document.getElementById("q01D").disabled = false;
        document.getElementById("q02C").disabled = false;
        document.getElementById("q03C").disabled = false;
        document.getElementById("q04E").disabled = false;
        document.getElementById("q05B").disabled = false;
        document.getElementById("q06B").disabled = false;
        document.getElementById("q07C").disabled = false;
        document.getElementById("q08E").disabled = false;
        document.getElementById("q09B").disabled = false;

    }

    esconderJogo(div) {

        // Cria a variável que contém a div da questão de acordo com o parâmetro recebido
        const q = document.querySelector(`#${div}`);

        // Anima e reposiciona a tela do jogo, div, corações, questões, crônometro, chaves e contador de passos
        setTimeout(() => {

            this.canvas.animate([{opacity: `0`, offset: 1}], {duration: 2222});

            this.vidas.animate([{opacity: `0`, offset: 1}], {duration: 2222});

            this.qs.animate([{opacity: `0`, offset: 1}], {duration: 2222});

            this.relogio.animate([{opacity: `0`, offset: 1}], {duration: 2222});

            this.contaPassos.animate([{opacity: `0`, offset: 1}], {duration: 2222});

            this.chaves.animate([{opacity: `0`, offset: 1}], {duration: 2222});

        }, 450);

        setTimeout(() => {

            this.canvas.style.visibility = `hidden`;
            this.canvas.style.paddingTop = `750px`;

            this.relogio.style.visibility = `hidden`;
            this.contaPassos.style.visibility = `hidden`;
            this.chaves.style.visibility = `hidden`;

            this.chaves.style.paddingLeft = `10000px`;

            this.vidas.style.paddingTop = `35px`;
            this.vidas.style.marginLeft = `6%`;

            this.qs.style.paddingTop = `150px`;
            this.qs.style.marginLeft = `6%`;

            q.style.visibility = `visible`;
            q.animate([{opacity: `0`, offset: 0}, {opacity: `1`, offset: 1}],
                {duration: 1234});

        }, 2222);

    }

    mostrarJogo(div) {

        // Cria a variável que contém a div da questão de acordo com o parâmetro recebido
        const q = document.querySelector(`#${div}`);

        // Anima e reposiciona a tela do jogo, div, corações, questões, crônometro,chaves e contador de passos
        setTimeout(() => {

            q.animate([{opacity: `0`, offset: 1}], {duration: 2222});

        }, 450);

        setTimeout(() => {

            q.style.visibility = `hidden`;

            this.canvas.style.visibility = `visible`;
            this.canvas.style.paddingTop = `0px`;
            this.canvas.animate([{opacity: `0`, offset: 0}, {opacity: `1`, offset: 1}],
                {duration: 1234});

            this.vidas.style.paddingTop = `35px`;
            this.vidas.style.marginLeft = `2%`;
            this.vidas.animate([{opacity: `0`, offset: 0}, {opacity: `1`, offset: 1}]);

            this.qs.style.paddingTop = `150px`;
            this.qs.style.marginLeft = `2%`;
            this.qs.animate([{opacity: `0`, offset: 0}, {opacity: `1`, offset: 1}]);

            this.relogio.style.visibility = `visible`;
            this.relogio.animate([{opacity: `0`, offset: 0}, {opacity: `1`, offset: 1}]);

            this.chaves.style.visibility = `visible`;
            this.chaves.style.marginLeft = `11.5%`;
            this.chaves.style.paddingLeft = `0px`;
            this.chaves.animate([{opacity: `0`, offset: 0}, {opacity: `1`, offset: 1}]);

            this.contaPassos.style.visibility = `visible`;
            this.contaPassos.animate([{opacity: `0`, offset: 0}, {opacity: `1`, offset: 1}]);

        }, 2222);

    }

    adicionarVida() {

        // Som ao coletar coração
        const pegouCora = new Audio(`./assets/sons/pegouCora.ogg`);
        pegouCora.play();

        // Lógica para adicionar vida ao jogador
        if (this.vida05.className == `mostrar`
            && this.vida04.className != `mostrar`) {

            this.vida04.className = `mostrar`;

            return;

        }

        if (this.vida04.className == `mostrar`
            && this.vida03.className != `mostrar`) {

            this.vida03.className = `mostrar`;

            return;

        }

        if (this.vida03.className == `mostrar`
            && this.vida02.className != `mostrar`) {

            this.vida02.className = `mostrar`;

            return;

        }

        if (this.vida02.className == `mostrar`
            && this.vida01.className != `mostrar`) {

            this.vida01.className = `mostrar`;

            return;

        }

    }

    acertouQuestao() {

        // Som ao acertar uma questão
        const acertouSom = new Audio(`./assets/sons/somAcertou.ogg`);
        acertouSom.play();

        // Lógica para adicionar questões acertadas ao jogador
        if (this.qs01.className != `mostrar`) {

            this.qs01.className = `mostrar`;

            return;

        }

        if (this.qs01.className == `mostrar`
            && this.qs02.className != `mostrar`) {

            this.qs02.className = `mostrar`;

            return;
        }

        if (this.qs02.className == `mostrar`
            && this.qs03.className != `mostrar`) {

            this.qs03.className = `mostrar`;

            return;

        }

        if (this.qs03.className == `mostrar`
            && this.qs04.className != `mostrar`) {

            this.qs04.className = `mostrar`;

            return;

        }

        if (this.qs04.className == `mostrar`
            && this.qs05.className != `mostrar`) {

            this.qs05.className = `mostrar`;

            return;

        }

        if (this.qs05.className == `mostrar`
            && this.qs06.className != `mostrar`) {

            this.qs06.className = `mostrar`;

            return;

        }

        if (this.qs06.className == `mostrar`
            && this.qs07.className != `mostrar`) {

            this.qs07.className = `mostrar`;

            return;

        }

        if (this.qs07.className == `mostrar`
            && this.qs08.className != `mostrar`) {

            this.qs08.className = `mostrar`;

            return;

        }

        if (this.qs08.className == `mostrar`
            && this.qs09.className != `mostrar`) {

            this.qs09.className = `mostrar`;

            return;

        }

    }

    errouQuestao() {

        // Som ao errar uma questão
        const errouSom = new Audio(`./assets/sons/somErrou.ogg`);
        errouSom.play();

        // Lógica para retirar corações do jogador
        if (this.vida01.className != `esconder`) {

            this.vida01.className = `esconder`;

            return;

        }

        if (this.vida01.className == `esconder`
            && this.vida02.className != `esconder`) {

            this.vida02.className = `esconder`;

            return;

        }

        if (this.vida02.className == `esconder`
            && this.vida03.className != `esconder`) {

            this.vida03.className = `esconder`;

            return;

        }

        if (this.vida03.className == `esconder`
            && this.vida04.className != `esconder`) {

            this.vida04.className = `esconder`;

            return;

        }

        if (this.vida04.className == `esconder`
            && this.vida05.className != `esconder`) {

            this.vida05.className = `esconder`;

            return;

        }

    }

    errouOrdemDasCores(cor) {

        if (cor == `azul`) {

            // Som
            this.rSom.play();

            // Reposiciona o jogador
            this.jogador.x = 45;
            this.jogador.y = 565;

            // Reinicia a lógica do jogo
            this.azul = true;
            this.vermelho = false;
            this.amarelo = false;

        }

        if (cor == `vermelho`) {

            // Som
            this.rSom.play();

            // Lógica para retirar corações do jogador
            if (this.vida01.className != `esconder`) {

                this.vida01.className = `esconder`;

                return;

            }

            if (this.vida01.className == `esconder`
                && this.vida02.className != `esconder`) {

                this.vida02.className = `esconder`;

                return;

            }

            if (this.vida02.className == `esconder`
                && this.vida03.className != `esconder`) {

                this.vida03.className = `esconder`;

                return;

            }

            if (this.vida03.className == `esconder`
                && this.vida04.className != `esconder`) {

                this.vida04.className = `esconder`;

                return;

            }

            if (this.vida04.className == `esconder`
                && this.vida05.className != `esconder`) {

                this.vida05.className = `esconder`;

                return;

            }

        }

        // Para todos os sons
        this.amareloSom2.stop();
        this.amareloSom.stop();
        this.azulSom.stop();
        this.azulSom2.stop();
        this.vermelhoSom.stop();
        this.vermelhoSom2.stop();

    }

    iniciarMovimentos() {

        // Setas do teclado
        this.setasDoTeclado = this.input.keyboard.createCursorKeys();

        // Move o jogador ao pressionar seta para esquerda
        if (this.setasDoTeclado.left.isDown
            && this.setasDoTeclado.up.isUp
            && this.setasDoTeclado.down.isUp
            && this.setasDoTeclado.right.isUp) {

            this.jogador.anims.play("left", true);
            this.jogador.setVelocityX(-240);

            this.setasDoTeclado.left.enabled = true;
            this.setasDoTeclado.up.enabled = false;
            this.setasDoTeclado.down.enabled = false;
            this.setasDoTeclado.right.enabled = false;

            // Move o jogador ao pressionar seta para direita
        } else if (this.setasDoTeclado.right.isDown
            && this.setasDoTeclado.up.isUp
            && this.setasDoTeclado.down.isUp
            && this.setasDoTeclado.left.isUp) {

            this.jogador.setVelocityX(240);
            this.jogador.anims.play("right", true);

            this.setasDoTeclado.left.enabled = false;
            this.setasDoTeclado.up.enabled = false;
            this.setasDoTeclado.down.enabled = false;
            this.setasDoTeclado.right.enabled = true;

            // Move o jogador ao pressionar seta para cima
        } else if (this.setasDoTeclado.up.isDown
            && this.setasDoTeclado.left.isUp
            && this.setasDoTeclado.right.isUp
            && this.setasDoTeclado.down.isUp) {

            this.jogador.anims.play("back", true);
            this.jogador.setVelocityY(-240);

            this.setasDoTeclado.left.enabled = false;
            this.setasDoTeclado.up.enabled = true;
            this.setasDoTeclado.down.enabled = false;
            this.setasDoTeclado.right.enabled = false;

            // Move o jogador ao pressionar seta para baixo
        } else if (this.setasDoTeclado.down.isDown
            && this.setasDoTeclado.left.isUp
            && this.setasDoTeclado.right.isUp
            && this.setasDoTeclado.up.isUp) {

            this.jogador.anims.play("front", true);
            this.jogador.setVelocityY(240);

            this.setasDoTeclado.left.enabled = true;
            this.setasDoTeclado.up.enabled = false;
            this.setasDoTeclado.down.enabled = true;
            this.setasDoTeclado.right.enabled = false;

        } else {

            this.jogador.anims.play(`front`, true);
            this.jogador.anims.stop();
            this.jogador.setVelocity(0);

            this.setasDoTeclado.left.enabled = true;
            this.setasDoTeclado.up.enabled = true;
            this.setasDoTeclado.down.enabled = true;
            this.setasDoTeclado.right.enabled = true;

        }

        // Inicia o som dos passos ao pressionar qualquer uma das setas
        if (this.setasDoTeclado.left.isDown
            || this.setasDoTeclado.right.isDown
            || this.setasDoTeclado.up.isDown
            || this.setasDoTeclado.down.isDown) {

            if (!this.somPassos.isPlaying) {

                this.somPassos.play();

            }

            // Para o som dos passos quando nenhuma seta é pressionada
        } else {

            this.somPassos.stop();

        }

    }

    envolverSprite(sprite) {

        // Lógica para não deixar o sprite sair da tela do jogo
        const halfWidth = sprite.displayWidth * 0.5;
        const gameWidth = this.scale.width;

        const halfHeight = sprite.displayHeight * 0.5;
        const gameHeight = this.scale.height;

        if (sprite.x < -halfWidth) {

            sprite.x = halfWidth + gameWidth;

        } else if (sprite.x > halfWidth + gameWidth) {

            sprite.x = -halfWidth;

        }

        if (sprite.y < -halfHeight) {

            sprite.y = halfHeight + gameHeight;

        } else if (sprite.y > halfHeight + gameHeight) {

            sprite.y = -halfHeight;

        }

    }

}

// Classe responsável por criar o crônometro do jogo
class Tempo {

    timer = document.getElementById('stopwatch');

    min = 0;
    sec = 0;

    stoptime = true;

    startTimer() {

        if (this.stoptime == true) {

            this.stoptime = false;
            this.timerCycle();

        }

    }

    stopTimer() {

        if (this.stoptime == false) {

            this.stoptime = true;

        }

    }

    timerCycle() {

        if (this.stoptime == false) {

            this.sec = parseInt(this.sec);
            this.min = parseInt(this.min);

            this.sec = this.sec + 1;

            if (this.sec == 60) {

                this.min = this.min + 1;
                this.sec = 0;

            }

            if (this.min == 60) {

                this.min = 0;
                this.sec = 0;

            }

            if (this.sec < 10 || this.sec == 0) {

                this.sec = '0' + this.sec;

            }

            if (this.min < 10 || this.min == 0) {

                this.min = '0' + this.min;

            }

            this.timer.innerHTML = this.min + ':' + this.sec;

            setTimeout(() => {

                this.timerCycle();

            }, 1000);

        }

    }

    resetTimer() {

        this.min = 0;
        this.sec = 0;

        this.timer.innerHTML = '00:00';

    }

}

export {Jogo};
