class Ganhou extends Phaser.Scene {

    canvas = document.querySelector(`canvas`);

    pt = document.querySelector(`#pt`);
    en = document.querySelector(`#en`);

    chaves = document.querySelector(`#chaves`);

    relogio = document.querySelector(`#relogio`);

    contaPassos = document.querySelector(`#contaPassos`);

    vidas = document.querySelector(`#vidas`);

    vida01 = document.querySelector(`#vida01`);
    vida02 = document.querySelector(`#vida02`);
    vida03 = document.querySelector(`#vida03`);
    vida04 = document.querySelector(`#vida04`);
    vida05 = document.querySelector(`#vida05`);

    vidas2 = document.querySelector(`#vidas2`);

    vida012 = document.querySelector(`#vida012`);
    vida022 = document.querySelector(`#vida022`);
    vida032 = document.querySelector(`#vida032`);
    vida042 = document.querySelector(`#vida042`);
    vida052 = document.querySelector(`#vida052`);

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

    qs2 = document.querySelector(`#qs2`);

    qs012 = document.querySelector(`#qs012`);
    qs022 = document.querySelector(`#qs022`);
    qs032 = document.querySelector(`#qs032`);
    qs042 = document.querySelector(`#qs042`);
    qs052 = document.querySelector(`#qs052`);
    qs062 = document.querySelector(`#qs062`);
    qs072 = document.querySelector(`#qs072`);
    qs082 = document.querySelector(`#qs082`);
    qs092 = document.querySelector(`#qs092`);

    ganhou;

    bVoltar;
    bSom;

    v;
    q;

    musicaGanhou;

    constructor() {

        super({key: `telaDeGanhou`});

    }

    preload() {

        this.load.image(`fundo04`, `./assets/imagens/fundo/fundoJogo04.png`);
        this.load.image(`fundo04E`, `./assets/imagens/fundo/fundoJogo04E.png`);

        this.load.image(`bJogar01E`, `./assets/imagens/UI/yellow_button02E.png`);
        this.load.image(`bJogar02E`, `./assets/imagens/UI/yellow_button03E.png`);


        this.load.image(`ganhou`, `./assets/imagens/sprites/ganhou2.png`);

    }

    create() {

        this.musicaGanhou = this.sound.add(`musicaGanhou`);

        this.vidas2.className = `mostrar`;

        this.mostrarVidas();
        this.mostrarQs();

        if (this.pt.checked) {

            this.add.image(400, 300, `fundo04`);

            this.bJogar = this.add.image(300, 580, `bJogar01`);
            this.bJogar.setInteractive();

            this.bJogar

                .on(`pointerdown`, () => {

                    this.bJogar = this.add.image(300, 580, `bJogar02`);
                    this.sound.play(`bSom`);

                    this.acaoBotaoJogar();

                })

                .on(`pointerup`, () => {

                    this.bJogar = this.add.image(300, 580, `bJogar01`);

                });

        } else if (this.en.checked) {

            this.add.image(400, 300, `fundo04E`);

            this.bJogar = this.add.image(300, 580, `bJogar01E`);
            this.bJogar.setInteractive();

            this.bJogar

                .on(`pointerdown`, () => {

                    this.bJogar = this.add.image(300, 580, `bJogar02E`);
                    this.sound.play(`bSom`);

                    this.acaoBotaoJogar();

                    setTimeout(() => {

                        this.scene.stop(`telaDeInicio`);
                        this.scene.start(`telaDoJogo`);

                    }, 450);

                })

                .on(`pointerup`, () => {

                    this.bJogar = this.add.image(300, 580, `bJogar01E`);

                });

        }

        this.bVoltar = this.add.image(500, 580, `bVoltar01`);
        this.bVoltar.setInteractive();

        this.bVoltar.on(`pointerdown`, () => {

            this.açãoBotãoVoltar();

        }).on(`pointerup`, () => {

            this.bVoltar = this.add.image(500, 580, `bVoltar01`);

        });

        this.add.image(400, 400, `ganhou`).setScale(0.7);

    }

    update(time, delta) {

        super.update(time, delta);

        if (!this.musicaGanhou.isPlaying) {

            this.musicaGanhou.play();

        }

    }

    acaoBotaoJogar() {

        document.querySelector(`#placarV`).style.visibility = `hidden`;
        document.querySelector(`#placarQ`).style.visibility = `hidden`;

        this.relogio.style.marginLeft = `20.5%`;
        this.relogio.style.paddingTop = `150px`;
        this.relogio.style.visibility = `hidden`;

        this.chaves.style.marginLeft = `11.5%`;
        this.chaves.style.paddingTop = `35px`;
        this.chaves.style.visibility = `hidden`;

        this.contaPassos.style.marginLeft = `12.5%`;
        this.contaPassos.style.paddingTop = `150px`;
        this.contaPassos.style.visibility = `hidden`;

        this.vida012.className = `esconder`;
        this.vida022.className = `esconder`;
        this.vida032.className = `esconder`;
        this.vida042.className = `esconder`;
        this.vida052.className = `esconder`;

        this.qs012.className = `esconder`;
        this.qs022.className = `esconder`;
        this.qs032.className = `esconder`;
        this.qs042.className = `esconder`;
        this.qs052.className = `esconder`;
        this.qs062.className = `esconder`;
        this.qs072.className = `esconder`;
        this.qs082.className = `esconder`;
        this.qs092.className = `esconder`;

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

            this.scene.stop(`telaDeInicio`);
            this.scene.start(`telaDoJogo`);

        }, 450);

    }

    açãoBotãoVoltar() {

        document.querySelector(`#placarV`).style.visibility = `hidden`;
        document.querySelector(`#placarQ`).style.visibility = `hidden`;

        this.relogio.style.marginLeft = `20.5%`;
        this.relogio.style.paddingTop = `150px`;
        this.relogio.style.visibility = `hidden`;

        this.chaves.style.marginLeft = `11.5%`;
        this.chaves.style.paddingTop = `35px`;
        this.chaves.style.visibility = `hidden`;

        this.contaPassos.style.marginLeft = `12.5%`;
        this.contaPassos.style.paddingTop = `150px`;
        this.contaPassos.style.visibility = `hidden`;

        this.bVoltar = this.add.image(500, 580, `bVoltar02`);

        this.sound.play(`bSom`);

        this.vida012.className = `esconder`;
        this.vida022.className = `esconder`;
        this.vida032.className = `esconder`;
        this.vida042.className = `esconder`;
        this.vida052.className = `esconder`;

        this.qs012.className = `esconder`;
        this.qs022.className = `esconder`;
        this.qs032.className = `esconder`;
        this.qs042.className = `esconder`;
        this.qs052.className = `esconder`;
        this.qs062.className = `esconder`;
        this.qs072.className = `esconder`;
        this.qs082.className = `esconder`;
        this.qs092.className = `esconder`;

        setTimeout(() => {

            setTimeout(() => {

                this.canvas.animate([{opacity: `0`, offset: 0}, {opacity: `1`, offset: 1}],
                    975);

                this.sound.stopAll();

                this.scene.stop(`telaDoFim`);
                this.scene.start(`telaDeInicio`);

            }, 125);

        }, 450);

    }

    mostrarVidas() {

        const placar = document.querySelector(`#placarV`);

        this.v = 0;

        if (this.vida05.className == `mostrar`) {

            this.vida052.className = `mostrar`;
            this.v = this.v + 1;

        } else {

            this.vida052.className = `esconder`;

        }

        if (this.vida04.className == `mostrar`) {

            this.vida042.className = `mostrar`;
            this.v = this.v + 1;

        } else {

            this.vida042.className = `esconder`;

        }

        if (this.vida03.className == `mostrar`) {

            this.vida032.className = `mostrar`;
            this.v = this.v + 1;

        } else {

            this.vida032.className = `esconder`;

        }
        if (this.vida02.className == `mostrar`) {

            this.vida022.className = `mostrar`;
            this.v = this.v + 1;

        } else {

            this.vida022.className = `esconder`;

        }

        if (this.vida01.className == `mostrar`) {

            this.vida012.className = `mostrar`;
            this.v = this.v + 1;

        } else {

            this.vida012.className = `esconder`;

        }

        if (placar.style.visibility != `visible`) {

            if (this.pt.checked) {

                placar.style.visibility = `visible`;
                placar.innerHTML = `<div style="padding-bottom: 10px">Vidas:</div>
${this.v}/5`;

            } else if (this.en.checked) {

                placar.style.visibility = `visible`;
                placar.innerHTML = `<div style="padding-bottom: 10px">Hearts:</div>
${this.v}/5`;

            }

        } else {

            placar.style.visibility = `hidden`;

        }

    }

    mostrarQs() {

        const placar = document.querySelector(`#placarQ`);

        this.q = 0;

        if (this.qs09.className == `mostrar`) {

            this.qs092.className = `mostrar`;
            this.q = this.q + 1;

        } else {

            this.qs092.className = `esconder`;

        }

        if (this.qs08.className == `mostrar`) {

            this.qs082.className = `mostrar`;
            this.q = this.q + 1;

        } else {

            this.qs082.className = `esconder`;

        }

        if (this.qs07.className == `mostrar`) {

            this.qs072.className = `mostrar`;
            this.q = this.q + 1;

        } else {

            this.qs072.className = `esconder`;

        }

        if (this.qs06.className == `mostrar`) {

            this.qs062.className = `mostrar`;
            this.q = this.q + 1;

        } else {

            this.qs062.className = `esconder`;
        }

        if (this.qs05.className == `mostrar`) {

            this.qs052.className = `mostrar`;
            this.q = this.q + 1;

        } else {

            this.qs052.className = `esconder`;

        }

        if (this.qs04.className == `mostrar`) {

            this.qs042.className = `mostrar`;
            this.q = this.q + 1;

        } else {

            this.qs042.className = `esconder`;

        }

        if (this.qs03.className == `mostrar`) {

            this.qs032.className = `mostrar`;
            this.q = this.q + 1;

        } else {

            this.qs032.className = `esconder`;

        }

        if (this.qs02.className == `mostrar`) {

            this.qs022.className = `mostrar`;
            this.q = this.q + 1;

        } else {

            this.qs022.className = `esconder`;

        }

        if (this.qs01.className == `mostrar`) {

            this.qs012.className = `mostrar`;
            this.q = this.q + 1;

        } else {

            this.qs012.className = `esconder`;

        }

        if (placar.style.visibility != `visible`) {

            if (this.pt.checked) {

                placar.style.visibility = `visible`;
                placar.innerHTML = `<div style="padding-bottom: 10px">Questões:</div>
${this.q}/9`;

            } else if (this.en.checked) {

                placar.style.visibility = `visible`;
                placar.innerHTML = `<div style="padding-bottom: 10px">Questions:</div>
${this.q}/9`;

            }

        } else {

            placar.style.visibility = `hidden`;

        }

    }

}

export {Ganhou};
