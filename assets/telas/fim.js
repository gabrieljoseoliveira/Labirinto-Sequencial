class Fim extends Phaser.Scene {

    canvas = document.querySelector(`canvas`);

    pt = document.querySelector(`#pt`);
    en = document.querySelector(`#en`);

    fim;

    bVoltar;
    bSom;

    musicaFim;

    constructor() {

        super({key: `telaDeFim`});

    }

    preload() {

        this.load.image(`fundo03`, `./assets/imagens/fundo/fundoJogo03.png`);
        this.load.image(`fim`, `./assets/imagens/sprites/fim2.png`);

    }

    create() {

        this.musicaFim = this.sound.add(`musicaFim`);

        this.add.image(400, 300, `fundo03`);
        this.add.image(400, 300, `fim`).setScale(0.5);

        if (this.pt.checked) {

            this.bJogar = this.add.image(400, 425, `bJogar01`);
            this.bJogar.setInteractive();

            this.bJogar

                .on(`pointerdown`, () => {

                    this.bJogar = this.add.image(400, 425, `bJogar02`);

                    this.acaoBotaoJogar();

                })

                .on(`pointerup`, () => {

                    this.bJogar = this.add.image(400, 425, `bJogar01`);

                });

        } else if (this.en.checked) {

            this.bJogar = this.add.image(400, 425, `bJogar01E`);
            this.bJogar.setInteractive();

            this.bJogar

                .on(`pointerdown`, () => {

                    this.bJogar = this.add.image(400, 425, `bJogar02E`);

                    this.acaoBotaoJogar();

                })

                .on(`pointerup`, () => {

                    this.bJogar = this.add.image(400, 425, `bJogar01E`);

                });

        }

        this.bVoltar = this.add.image(400, 480, `bVoltar01`);
        this.bVoltar.setInteractive();

        this.bVoltar.on(`pointerdown`, () => {
            this.bVoltar = this.add.image(400, 480, `bVoltar02`);
            this.sound.play(`bSom`);
            setTimeout(() => {

                setTimeout(() => {
                    this.canvas.animate([{opacity: `0`, offset: 0}, {opacity: `1`, offset: 1}],
                        975);

                    this.sound.stopAll();

                    this.scene.stop(`telaDoFim`);
                    this.scene.start(`telaDeInicio`);

                }, 125);

            }, 450);
        }).on(`pointerup`, () => {

            this.bVoltar = this.add.image(400, 480, `bVoltar01`);

        });

    }

    acaoBotaoJogar() {

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

            this.scene.stop(`telaDeInicio`);
            this.scene.start(`telaDoJogo`);

        }, 450);

    }

    update(time, delta) {

        super.update(time, delta);

        if (!this.musicaFim.isPlaying) {

            this.musicaFim.play();

        }

    }

}

export {Fim};
