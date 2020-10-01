function MapManager(timer) { // Constructeur MapManager

    // Propriétés
    this.timer = timer; // objet timer
    
    var that = this; // Prévu pour les évènement pour faire références à l'objet
    
    this.markers = []; // Tableau vide pour les marqueurs
    
    this.infosStation = $('#infosStation'); // élément div#infoStation
    
    this.infosStation.hide(); // élément div#infoStation caché
    
    this.containerMap = $('#containerMap'); // élément div#containerMap
    
    this.container = $('#container'); // élément div#container
    
    this.reservationAnnuler = $('#reservationAnnuler'); // élément html
    
    this.reservationReprise = $('#reservationReprise'); // élément html
    
    this.reservationPause = $('#reservationPause'); // élément html
    
    this.fermer = $('#fermer'); // élément div#fermer
    
    this.carte = $('#map'); // élément div#map
    
    this.myLatLng = { // Coordonnées GPS de la ville de Lyon

        lat: 45.75,
        lng: 4.85

    };

    // Méthodes
    this.initCarte = function () {

        this.appelJson();
        this.evenement();

    };

    // Création de la map
    this.map = new google.maps.Map(document.getElementById('map'), {

        center: this.myLatLng,
        zoom: 14

    });

    // Appel JSON
    this.appelJson = function () {

        $.getJSON('https://api.jcdecaux.com/vls/v1/stations?apiKey=6ca35c2311d2adaeed3a0eaff97c6d2187256338', function (data) {

            $.each(data, function (key, val) {

                var test = null;

                var latLng = {

                    lat: data[key].position.lat, // position des stations : lattitude
                    lng: data[key].position.lng  // position des stations : longitude

                }

                var icone;

                // Si l'état de la station est égal à OPEN et que le nombre de vélos disponible est supérieur à 1 
                if (data[key].status === 'OPEN' && data[key].available_bikes >= 1) {

                    icone = 'img/iconOuverte.png'; // J'affiche l'icône verte

                    
                }
                // Sinon si l'état de la station est égal à CLOSED et que le nombre de vélos disponible est strictement égale à 0 
                else if (data[key].status = 'CLOSED' && data[key].available_bikes === 0) {

                    icone = 'img/iconFermer.png'; // J'affiche l'icône rouge

                }

                var marker = new google.maps.Marker({

                    position: latLng,
                    map: that.map,
                    title: data[key].name,
                    icon: icone

                });

                // Evenement sur les marqueurs
                marker.addListener('click', function () {

                    // Si l'état de la station est égal à OPEN
                    if (data[key].status === 'OPEN') {

                        data[key].status = 'OUI'; // Je modifie OPEN par OUI
                        
                        $('#reserver').css('display', 'inline'); // J'affiche la possibilitée de réserver
                        
                        that.fermer.css('display', 'inline');
                        
                        $('#newChoice').html('');

                    } else if (data[key].available_bikes === 0) { // Si il n'y a pas de vélos disponible

                        data[key].status = 'NON'; // Je modifie l'état de la station par NON

                        $('#reserver').css('display', 'none'); // Je cache la possibilitée de réserver

                        that.fermer.css('display', 'none');

                        $('#newChoice').html( // J'affiche l'obligation de choisir une nouvelle station Ouverte (verte)
                            
                            '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Veuillez choisir une nouvelle station. <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>'
                            
                        );

                    } else if (data[key].available_bikes > 0) {

                        $('#reserver').css('display', 'inline');

                        that.fermer.css('display', 'inline');

                        $('#newChoice').html('');

                    }

                    $('#canvasPlace').hide(); // L'élément canvasPlace est caché 

                    that.infosStation.show(); // L'élément infosStation est affiché

                    $('#adresse').html("<i class='couleur'><u>Adresse:</u></i> " + data[key].name); // Information sur la station

                    $('#places').html("<i class='couleur'><u>Places disponibles:</u></i> " + data[key].bike_stands); // Information sur la station

                    $('#velos').html("<i class='couleur'><u>Vélos disponibles:</u></i> " + data[key].available_bikes); // Information sur la station

                    $('#ouverte').html("<i class='couleur'><u>Ouverte:</u></i> " + data[key].status); // Information sur la station

                    $('.couleur').css('color', '#5f9ea0'); // Couleur des class ci-dessus

                    that.container.css('width', '75%'); // L'élément container d'une largeur de 75% 

                    // Enregistrer dans sessionStorage du nom de la station
                    sessionStorage.setItem('nomStation', data[key].name);

                });

                that.markers.push(marker); // Ajout des marqueur au tableau 'markers'

            });

            // Regroupement de marqueurs
            var markerCluster = new MarkerClusterer(that.map, that.markers, {

                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'

            });

        });


    };
    
    this.evenement = function () {

        this.fermer.click(function () {

            that.containerMap.css('flex', 'none');
            
            that.container.css('width', '100%');

        });

        this.reservationAnnuler.click(function () {

            that.timer.reset();

            $('.sinon0').html('Vous avez annulé la réservation, désormais votre session est désactivée.');
                
            $('.sinon1').html('Votre vélo est de nouveau libre, merci d\'avoir utilisé velib\'mania!');

            sessionStorage.clear();

        });

        $(window).ready(function () {

            if (sessionStorage.getItem('minutes') === null) {

                return;

            }

            // Moment du rafraîchissement
            var d = new Date(); 

            // Timestamp du rafraîchissement
            var tempsT = d.getTime(); 

            // Timestamp du rafraîchissement - Timestamp du moment ou l'on valide la signature
            var tempsPasser = tempsT - sessionStorage.getItem('dateNow');

            var secondes = Math.floor(tempsPasser / 1000) % 60;

            var minutes = Math.floor(tempsPasser / 60000) % 60;

            if (minutes >= 20) {

                sessionStorage.clear();

            } else {

                that.timer.secondStart(secondes, minutes);

                // Affiche le footer
                $('footer').show();

                $('.sinon0').html('Vous avez réservé un vélib à la station : ' + sessionStorage.getItem('nomStation') + '.');
                
                $('.sinon1').html('Vous pouvez venir cherher le vélo avant la fin du temps impartis.');

            }

        });

    };

}
