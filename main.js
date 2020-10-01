function initMap() { // CallBack de l'api google map
    
    var diaporama = new Diaporama(); // Nouvelle instance (objet) du constructeur Diaporama
    var timer = new Timer('timerBike'); // Nouvelle instance (objet) du constructeur Timer
    var mapManager = new MapManager(timer); // Nouvelle instance (objet) du constructeur MapManager
    var dessinCanvas = new Canvas(timer); // Nouvelle instance (objet) du constructeur Canvas
    
    diaporama.initDiaporama();
    mapManager.initCarte();
    dessinCanvas.init();

}
