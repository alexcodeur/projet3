function Diaporama() { // Constructeur Diaporama

    // Propriétés
    this.boutonGauche = $('#boutonGauche');
    this.boutonDroite = $('#boutonDroite');
    this.idImg = 0;
    this.document = $(document);
    var that = this;

    // Méthodes
    this.initDiaporama = function () {

        this.evenement();

    }

    this.evenement = function () {

        this.boutonGauche.click(function () {

            if (that.idImg === 0) { // Si that.idImg est égal à 0

                $('#img1').fadeOut(1000); // L'image 1 disparaît en 1 seconde

                $('#pImg1').fadeOut(1000); // le texte disparaît en 1 seconde

                $('#img4').fadeIn(1000); // L'image 4 apparaît en 1 seconde, donc remplace la précédente

                $('#pImg4').fadeIn(1000); // Le texte 4 apparaît en 1 seconde, donc remplace le précédente

                that.idImg--; // On décrémente that.idImg

                if (that.idImg < 0) { // Si that.idImg est inférieur à 0

                    that.idImg = 3; // that.idImg égale 3

                }

            } else if (that.idImg === 3) { // Si that.idImg égale 3

                $('#img4').fadeOut(1000); // L'image 4 disparaît en 1 seconde

                $('#pImg4').fadeOut(1000); // le texte disparaît en 1 seconde

                $('#img3').fadeIn(1000); // L'image 3 apparaît en 1 seconde, donc remplace la précédente

                $('#pImg3').fadeIn(1000); // Le texte 3 apparaît en 1 seconde, donc remplace le précédente

                that.idImg--; // On décrémente that.idImg

            } else if (that.idImg === 2) { // Si that.idImg égale 2

                $('#img3').fadeOut(1000); // L'image 3 disparaît en 1 seconde

                $('#pImg3').fadeOut(1000); // le texte disparaît en 1 seconde

                $('#img2').fadeIn(1000); // L'image 2 apparaît en 1 seconde, donc remplace la précédente

                $('#pImg2').fadeIn(1000); // Le texte 2 apparaît en 1 seconde, donc remplace le précédente

                that.idImg--; // On décrémente that.idImg

            } else if (that.idImg === 1) { // Si that.idImg égale 1

                $('#img2').fadeOut(1000); // L'image 2 disparaît en 1 seconde

                $('#pImg2').fadeOut(1000); // le texte disparaît en 1 seconde

                $('#img1').fadeIn(1000); // L'image 1 apparaît en 1 seconde, donc remplace la précédente

                $('#pImg1').fadeIn(1000); // Le texte 1 apparaît en 1 seconde, donc remplace le précédente

                that.idImg = 0; // that.idImg égale 0
            }

        });

        // Je recommence l'opération avec le bouton de droite

        this.boutonDroite.click(function () {

            if (that.idImg === 0) {

                $('#img4').fadeOut(1);

                $('#img1').fadeOut(1000); // L'image disparaît en 1 seconde

                $('#pImg1').fadeOut(1000); // le texte disparaît en 1 seconde

                $('#img2').fadeIn(1000); // L'image apparaît en 1 seconde, donc remplace la précédente

                $('#pImg2').fadeIn(1000); // Le texte apparaît en 1 seconde, donc remplace le précédente

                that.idImg++;

            } else if (that.idImg === 1) {

                $('#img2').fadeOut(1000); // L'image disparaît en 1 seconde

                $('#pImg2').fadeOut(1000); // le texte disparaît en 1 seconde

                $('#img3').fadeIn(1000); // L'image apparaît en 1 seconde, donc remplace la précédente

                $('#pImg3').fadeIn(1000); // Le texte apparaît en 1 seconde, donc remplace le précédente

                that.idImg++;

            } else if (that.idImg === 2) {

                $('#img3').fadeOut(1000); // L'image disparaît en 1 seconde

                $('#pImg3').fadeOut(1000); // le texte disparaît en 1 seconde

                $('#img4').fadeIn(1000); // L'image apparaît en 1 seconde, donc remplace la précédente

                $('#pImg4').fadeIn(1000); // Le texte apparaît en 1 seconde, donc remplace le précédente

                that.idImg++;

            } else if (that.idImg === 3) {

                $('#img4').fadeOut(1000); // L'image disparaît en 1 seconde

                $('#pImg4').fadeOut(1000); // le texte disparaît en 1 seconde

                $('#img1').fadeIn(1000); // L'image apparaît en 1 seconde, donc remplace la précédente

                $('#pImg1').fadeIn(1000); // Le texte apparaît en 1 seconde, donc remplace le précédente

                that.idImg = 0;
            }

        });

        // Je recommence l'opération avec le bouton gauche et le bouton droit du clavier

        this.document.keyup(function (e) {

            if (e.keyCode) {

                if (e.keyCode === 37) {

                    if (that.idImg === 0) {

                        $('#img1').fadeOut(1000); // L'image disparaît en 1 seconde

                        $('#pImg1').fadeOut(1000); // le texte disparaît en 1 seconde
                        
                        $('#img4').fadeIn(1000); // L'image apparaît en 1 seconde, donc remplace la précédente

                        $('#pImg4').fadeIn(1000); // le texte apparaît en 1 seconde

                        that.idImg--;

                        if (that.idImg < 0) {

                            that.idImg = 3;

                        }

                    } else if (that.idImg === 3) {


                        $('#img4').fadeOut(1000); // L'image disparaît en 1 seconde

                        $('#pImg4').fadeOut(1000); // le texte disparaît en 1 seconde

                        $('#img3').fadeIn(1000); // L'image apparaît en 1 seconde, donc remplace la précédente

                        $('#pImg3').fadeIn(1000); // le texte apparaît en 1 seconde

                        that.idImg--;

                    } else if (that.idImg === 2) {


                        $('#img3').fadeOut(1000); // L'image disparaît en 1 seconde

                        $('#pImg3').fadeOut(1000); // le texte disparaît en 1 seconde

                        $('#img2').fadeIn(1000); // L'image apparaît en 1 seconde, donc remplace la précédente

                        $('#pImg2').fadeIn(1000); // le texte apparaît en 1 seconde

                        that.idImg--;

                    } else if (that.idImg === 1) {


                        $('#img2').fadeOut(1000); // L'image disparaît en 1 seconde

                        $('#pImg2').fadeOut(1000); // le texte disparaît en 1 seconde

                        $('#img1').fadeIn(1000); // L'image apparaît en 1 seconde, donc remplace la précédente

                        $('#pImg1').fadeIn(1000); // le texte apparaît en 1 seconde

                        that.idImg = 0;
                    }

                }

            }

            if (e.keyCode) {

                if (e.keyCode === 39) {

                    if (that.idImg === 0) {

                        $('#img4').fadeOut(1); 

                        $('#img1').fadeOut(1000); // L'image disparaît en 1 seconde

                        $('#pImg1').fadeOut(1000); // le texte disparaît en 1 seconde

                        $('#img2').fadeIn(1000); // L'image apparaît en 1 seconde, donc remplace la précédente

                        $('#pImg2').fadeIn(1000); // le texte apparaît en 1 seconde

                        that.idImg++;

                    } else if (that.idImg === 1) {


                        $('#img2').fadeOut(1000); // L'image disparaît en 1 seconde

                        $('#pImg2').fadeOut(1000); // le texte disparaît en 1 seconde 

                        $('#img3').fadeIn(1000); // L'image apparaît en 1 seconde, donc remplace la précédente

                        $('#pImg3').fadeIn(1000); // le texte apparaît en 1 seconde

                        that.idImg++;

                    } else if (that.idImg === 2) {


                        $('#img3').fadeOut(1000); // L'image disparaît en 1 seconde

                        $('#pImg3').fadeOut(1000); // le texte disparaît en 1 seconde

                        $('#img4').fadeIn(1000); // L'image apparaît en 1 seconde, donc remplace la précédente

                        $('#pImg4').fadeIn(1000); // le texte apparaît en 1 seconde

                        that.idImg++;

                    } else if (that.idImg === 3) {


                        $('#img4').fadeOut(1000); // L'image disparaît en 1 seconde

                        $('#pImg4').fadeOut(1000); // le texte disparaît en 1 seconde

                        $('#img1').fadeIn(1000); // L'image apparaît en 1 seconde, donc remplace la précédente

                        $('#pImg1').fadeIn(1000); // le texte apparaît en 1 seconde

                        that.idImg = 0;

                    }
                }
            }

        });

    }

}
