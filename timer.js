function Timer(balise) { // Constructeur Timer

    // Propriétés
    this.minutes = 20;
    
    this.secondes = 0;
    
    this.balise = $('#' + balise);
    
    this.interval;

    var that = this;

    // Méthodes
    this.init = function () {
        
        sessionStorage.setItem("minutes", this.minutes);
        
        sessionStorage.setItem("secondes", this.secondes);
        
        that.balise.html(that.afficheZero(that.minutes) + ' : ' + that.afficheZero(that.secondes));
        
        that.decompte();
        
    }

    this.afficheZero = function (value) {
        
        if (value < 10) {

            return "0" + value;

        } else {

            return value;

        }

    }

    this.decompte = function () {

        sessionStorage.setItem("minutes", this.minutes);
        
        sessionStorage.setItem("secondes", this.secondes);
        
        this.secondes--;

        if (this.secondes < 0) {

            this.secondes = 59;

            this.minutes--;

        }

        if (this.minutes === -1) {
            
            this.stop();

            $('.sinon0').html('Session expirée.');
            
            $('.sinon1').html('Vous pouvez réserver un vélib à nouveau.');
            
            $('.sinon2').html('Merci d\'avoir utilisé Velib\'Mania !');
            
            sessionStorage.clear();

        }

    } 

    this.start = function () {
        
        this.interval = setInterval(this.init, 1000);
        
    }

    this.stop = function () {

        clearInterval(this.interval);

    }

    this.reset = function () {

        this.stop();
        
        this.minutes = 20;
        
        this.secondes = 0;

    }
    
    this.secondStart = function (secondes, minutes) {
        
        if (this.secondes === 0) {
            
            this.secondes = 59 - secondes;
            
        }
        
        if (this.minutes === 20) {
            
            this.minutes = 19 - minutes;
            
        }
        
        this.start();
        
    }
    
}