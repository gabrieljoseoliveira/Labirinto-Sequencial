class Iniciar extends Phaser.Scene {

    bTutorial;
    bCreditos;
    bJogar;
    bSom;

    musicaTitulo;

    canvas = document.querySelector(`canvas`);

    ops = document.querySelector(`#opcoes`);

    pt = document.querySelector(`#pt`);
    en = document.querySelector(`#en`);

    volume = document.querySelector(`#volume`);

    html = document.documentElement;

    constructor() {

        super({key: `telaDeInicio`});

    }

    preload() {

        this.load.image(`fundo01`, `./assets/imagens/fundo/boasVindas.png`);
        this.load.image(`fundo01E`, `./assets/imagens/fundo/boasVindasE.png`);

        this.load.image(`bTutorial01`, `./assets/imagens/UI/red_button01.png`);
        this.load.image(`bTutorial02`, `./assets/imagens/UI/red_button02.png`);

        this.load.image(`bTutorial01E`, `./assets/imagens/UI/red_button01E.png`);
        this.load.image(`bTutorial02E`, `./assets/imagens/UI/red_button02E.png`);

        this.load.image(`bJogar01`, `./assets/imagens/UI/yellow_button02.png`);
        this.load.image(`bJogar02`, `./assets/imagens/UI/yellow_button03.png`);

        this.load.image(`bJogar01E`, `./assets/imagens/UI/yellow_button02E.png`);
        this.load.image(`bJogar02E`, `./assets/imagens/UI/yellow_button03E.png`);

        this.load.image(`bCreditos01`, `./assets/imagens/UI/blue_button06.png`);
        this.load.image(`bCreditos02`, `./assets/imagens/UI/blue_button07.png`);

        this.load.image(`bCreditos01E`, `./assets/imagens/UI/blue_button06E.png`);
        this.load.image(`bCreditos02E`, `./assets/imagens/UI/blue_button07E.png`);

        this.load.audio(`bSom`, `./assets/sons/somClick.ogg`);

        this.load.audio(`musicaTitulo`, `./assets/sons/musicaTitulo.mp3`);
        this.load.audio(`musicaJogo`, `./assets/sons/musicaJogo.mp3`);
        this.load.audio(`musicaGanhou`, `./assets/sons/musicaGanhou.mp3`);
        this.load.audio(`musicaFim`, `./assets/sons/musicaFim.mp3`);

    }

    create() {

        if (this.pt.checked) {

            this.add.image(400, 300, `fundo01`);

            this.bJogar = this.add.image(400, 350, `bJogar01`);
            this.bJogar.setInteractive();

            this.bJogar

                .on(`pointerdown`, () => {

                    this.bJogar = this.add.image(400, 350, `bJogar02`);
                    this.sound.play(`bSom`);

                    const canvas = document.querySelector(`canvas`);

                    setTimeout(
                        () => {
                            canvas.animate([
                                    {paddingTop: `750px`, offset: 0}],
                                3000
                            );
                        }, 450
                    );

                    setTimeout(() => {

                        this.ativarTelaCheia();

                        this.scene.stop(`telaDeInicio`);
                        this.scene.start(`telaDoJogo`);

                    }, 450);

                })

                .on(`pointerup`, () => {

                    this.bJogar = this.add.image(400, 350, `bJogar01`);

                });

            this.bTutorial = this.add.image(400, 405, `bTutorial01`);
            this.bTutorial.setInteractive();

            this.bTutorial

                .on(`pointerdown`, () => {

                    this.bTutorial = this.add.image(400, 405, `bTutorial02`);
                    this.sound.play(`bSom`);
                    this.esconderJogo(`tutorial`);

                })

                .on(`pointerup`, () => {

                    this.bTutorial = this.add.image(400, 405, `bTutorial01`);

                });

            this.bCreditos = this.add.image(400, 460, `bCreditos01`);
            this.bCreditos.setInteractive();

            this.bCreditos

                .on(`pointerdown`, () => {

                    this.bCreditos = this.add.image(400, 460, `bCreditos02`);
                    this.sound.play(`bSom`);
                    this.esconderJogo(`creditos`);

                })

                .on(`pointerup`, () => {

                    this.bCreditos = this.add.image(400, 460, `bCreditos01`);

                });

        } else if (this.en.checked) {

            this.add.image(400, 300, `fundo01E`);

            this.bJogar = this.add.image(400, 350, `bJogar01E`);
            this.bJogar.setInteractive();

            this.bJogar

                .on(`pointerdown`, () => {

                    this.bJogar = this.add.image(400, 350, `bJogar02E`);
                    this.sound.play(`bSom`);

                    const canvas = document.querySelector(`canvas`);

                    setTimeout(
                        () => {
                            canvas.animate([
                                    {paddingTop: `750px`, offset: 0}],
                                3000
                            );
                        }, 450
                    );

                    setTimeout(() => {

                        this.ativarTelaCheia();

                        this.scene.stop(`telaDeInicio`);
                        this.scene.start(`telaDoJogo`);

                    }, 450);

                })

                .on(`pointerup`, () => {

                    this.bJogar = this.add.image(400, 350, `bJogar01E`);

                });

            this.bTutorial = this.add.image(400, 405, `bTutorial01E`);
            this.bTutorial.setInteractive();

            this.bTutorial

                .on(`pointerdown`, () => {

                    this.bTutorial = this.add.image(400, 405, `bTutorial02E`);
                    this.sound.play(`bSom`);
                    this.esconderJogo(`tutorial`);

                })

                .on(`pointerup`, () => {

                    this.bTutorial = this.add.image(400, 405, `bTutorial01E`);

                });

            this.bCreditos = this.add.image(400, 460, `bCreditos01E`);
            this.bCreditos.setInteractive();

            this.bCreditos

                .on(`pointerdown`, () => {

                    this.bCreditos = this.add.image(400, 460, `bCreditos02E`);
                    this.sound.play(`bSom`);
                    this.esconderJogo(`creditos`);

                })

                .on(`pointerup`, () => {

                    this.bCreditos = this.add.image(400, 460, `bCreditos01E`);

                });

        }

        this.musicaTitulo = this.sound.add(`musicaTitulo`);

        this.ops.style.visibility = `visible`;

    }

    update(time, delta) {

        super.update(time, delta);

        if (!this.musicaTitulo.isPlaying) {

            this.musicaTitulo.play();

        }

        this.game.sound.setVolume(this.volume.value/100);

    }

    esconderJogo(div) {

        const q = document.querySelector(`#${div}`);

        setTimeout(() => {

            this.canvas.animate([{opacity: `0`, offset: 1}], {duration: 2222});

        }, 450);

        setTimeout(() => {

            this.canvas.style.visibility = `hidden`;
            this.canvas.style.paddingTop = `750px`;

            this.ops.style.visibility = `hidden`;

            q.style.visibility = `visible`;
            q.animate([{opacity: `0`, offset: 0}, {opacity: `1`, offset: 1}],
                {duration: 1234});

        }, 2222);

    }

    mostrarJogo(div) {

        const q = document.querySelector(`#${div}`);

        setTimeout(() => {

            q.animate([{opacity: `0`, offset: 1}], {duration: 2222});

        }, 450);

        setTimeout(() => {

            q.style.visibility = `hidden`;

            this.ops.style.visibility = `visible`;

            this.canvas.style.visibility = `visible`;
            this.canvas.style.paddingTop = `0px`;
            this.canvas.animate([{opacity: `0`, offset: 0}, {opacity: `1`, offset: 1}],
                {duration: 1234});

        }, 2222);

    }

    ativarTelaCheia() {

        if (this.html.requestFullscreen) {

            this.html.requestFullscreen();

        } else if (this.html.webkitRequestFullscreen) {

            this.html.webkitRequestFullscreen();

        } else if (this.html.msRequestFullscreen) {

            this.html.msRequestFullscreen();

        }

    }

}

export {Iniciar};
