function Canvas(timer) { // Constructeur Canvas

    // Propriétés
    var that = this; // Prévu pour faire références à l'objet lors des évènements

    this.timer = timer; // objet timer

    this.canvasDiv = $('#canvasDiv'); // élément canvasDiv

    this.canvasDiv.hide(); // élément canvasDiv caché

    this.canvasPlace = $('#canvasPlace'); // élément contenant l'élément canvasDiv

    this.canvasPlace.hide(); // élément canvasPlace caché

    this.fermer = $('#fermer'); // élément bouton fermer

    this.clickX = []; // tableau

    this.clickY = []; // tableau

    this.clickDrag = []; // tableau

    this.paint = false; // paint égale à false

    this.context = null; // context du canvas

    $('footer').hide(); // élément footer caché

    // Méthodes
    this.init = function () {

        this.creationCanvas();

        this.addClick();

        this.redraw();

        this.evenementOrdinateur();

        this.evenement();

        this.evenementMobile();

    };

    this.creationCanvas = function () { // Canvas créé puis ajouté au DOM

        var canvas = $('<canvas id="canvas"></canvas>');

        canvas.attr('width', '500px');

        canvas.attr('height', '300px');

        canvas.css('border', '1px solid rgb(95, 158, 160)');

        this.canvasDiv.append(canvas);

        this.context = $('#canvas').get([0]).getContext("2d");

    };

    this.addClick = function (x, y, dragging) {

        // Ajout à ces différents tableaux les données récupérées lors de la signature
        
        this.clickX.push(x);

        this.clickY.push(y);

        this.clickDrag.push(dragging);

    };

    this.redraw = function () {

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Efface le canvas

        this.context.strokeStyle = "black"; // Couleur de l'écriture

        this.context.lineJoin = "round"; // ligne de forme ronde

        this.context.lineWidth = 5; // épaisseur de la ligne 

        for (var i = 0; i < this.clickX.length; i++) { // boucle for qui incrémente i tant qu'il est inférieur à la longeur du tableau clickX

            this.context.beginPath(); // On commence à dessiner

            if (this.clickDrag[i] && i) { // Si l'index du tableaux clikDrag vaux true et i vaux la longueur du tableaux clickX

                this.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]); // les points sont relié

            } else {

                this.context.moveTo(this.clickX[i] - 1, this.clickY[i]); // Sinon les points sont redessiné

            }

            this.context.lineTo(this.clickX[i], this.clickY[i]); // Dessiner des lignes droites

            this.context.closePath(); // Ferme le trajet pour que les fonctions de dessin ultérieures soient à nouveau dirigées vers le contexte

            this.context.stroke(); // Les points sont relié

        }

    };

    this.evenementOrdinateur = function () { // évènement depuis l'ordinateur

        $('#canvas').mousedown(function (e) { // lors du maintiens du click de la souris

            that.valider = e.pageX - this.offsetLeft;

            var mouseY = e.pageY - this.offsetTop;

            that.paint = true;

            that.addClick(e.pageX - this.offsetLeft, e.pageY - that.offsetTop);

            that.redraw();

        });

        $('#canvas').mousemove(function (e) { // lors du mouvement de la souris

            if (that.paint) {

                that.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);

                that.redraw();

            }

        });

        $('#canvas').mouseup(function (e) { // lors du relachement du click de la souris

            that.paint = false;

        });

        $('#canvas').mouseleave(function (e) { // lorsque la souris quitte l'élément canvas

            that.paint = false;

        });

    };

    this.evenementMobile = function () {

        //Doigt enfoncé sur le canvas
        $('#canvas').on('touchstart', function (e) {

            var canvas = $(this)[0];

            e.preventDefault();

            that.valider = e.originalEvent.touches[0].pageX - canvas.offsetLeft;

            var mouseY = e.originalEvent.touches[0].pageY - canvas.offsetTop;

            that.paint = true;

            that.addClick(e.originalEvent.touches[0].pageX - canvas.offsetLeft, e.originalEvent.touches[0].pageY - canvas.offsetTop);

            that.redraw();

        });

        //Doigt en mouvement sur le canvas
        $('#canvas').on('touchmove', function (e) {

            var canvas = $(this)[0];

            e.preventDefault();

            if (that.paint) {

                that.addClick(e.originalEvent.touches[0].pageX - canvas.offsetLeft, e.originalEvent.touches[0].pageY - canvas.offsetTop, true);

                that.redraw();

            }

        });

        //Doigt relache le canvas
        $('#canvas').on('touchend', function (e) {

            that.paint = false;

        });

    }

    this.evenement = function () {

        //Création différent éléments HTML + ajout au DOM
        var timerContainer = $('#timer');

        timerContainer.css('width', '300px').css('height', '80px').css('margin', '0 auto');

        var timerBike = $('#timerBike');

        timerBike.css('fontSize', '50px');

        var stopReservation = $('#stopReservation');


        $('#valider').click(function () {

            if (that.clickX.length === 0) {

                return;

            }

            sessionStorage.setItem("minutes", that.timer.minutes);

            sessionStorage.setItem("secondes", that.timer.secondes);

            var date = new Date();

            var dateNow = date.getTime();

            sessionStorage.setItem('dateNow', dateNow);

            // Cache l'élément canvas
            $('#canvasPlace').hide();

            // Affiche le footer
            $('footer').show();

            $('.sinon0').html('Vous avez réservé un vélib à la station : ' + sessionStorage.getItem('nomStation') + '.');

            $('.sinon1').html('Vous pouvez venir cherher le vélo avant la fin du temps impartis.');

            $('.sinon2').html('');
            
            // Affiche le timer
            timerContainer.show();

            //Reset le timer
            that.timer.reset();

            // Démarre le timer
            that.timer.start();

        });

        $('#supprimer').click(function () {

            that.clickX = [];

            that.clickY = [];

            that.clickDrag = [];

            that.redraw();

        });

        $('#reserver').click(function () {

            that.canvasDiv.show();

            that.canvasPlace.show();

            $('#reservationDiv').show();

            that.canvasDiv.css('width', '500px').css('height', '300px').css('margin', '0 auto');

            $('#canvas').css('border', '1px solid');

        });

        this.fermer.click(function () {

            $('#canvasPlace').hide(); // Cache l'élément div#canvasPlace

            $('#infosStation').hide(); // Cache l'élément div#infosStation

        });

    }

}
