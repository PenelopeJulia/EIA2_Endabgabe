"use strict";
// Eisdealer-Simulator
// Penelope Vogel, 270002, MKB2
// In Zusammenarbeit mit Julia Mamani, Evelin Sinner, Anna-Lena Jörger
var EisdealerSimulator;
(function (EisdealerSimulator) {
    // Vier Variabel für die Bilder, damit diese genutzt werden können
    // Maps =  wird mit Images gefüllt, Images= Laden Bilder vor -> mit Maps möchte man, dass Bild nicht ständig abgefragt wird -> eingefügte Bild wiedergenutzt, damit Browser nicht crasht wegen zu viel abfragen 
    EisdealerSimulator.sauceImages = new Map();
    for (let sauce of ['karamel', 'himbeere', 'schokolade']) {
        // Bilder werden erzeugt
        let img = new Image();
        // Pfad, wo sich die Bilder für Saucen befinden, ${]=Variabel
        img.src = `Bilder/sauce/${sauce}.png`;
        EisdealerSimulator.sauceImages.set(sauce, img);
    }
    // Bilder Toppings
    EisdealerSimulator.toppingImages = new Map();
    // Array, mit den Topping-Bildern
    for (let topping of ['keks', 'mms', 'sahne']) {
        // Bilder werden erzeugt
        let img = new Image();
        // Pfad, wo sich die Bilder für Toppings befinden, ${]=Variabel
        img.src = `Bilder/topping/${topping}.png`;
        EisdealerSimulator.toppingImages.set(topping, img);
    }
    // Bilder Eissorten
    EisdealerSimulator.sorteImages = new Map();
    for (let sorte of ['vanille', 'schoko', 'karamell', 'pistazie', 'erdbeer', 'straccia', 'zitrone', 'mango']) {
        let img = new Image();
        // Pfad, wo sich die Bilder für Eissorten befinden, ${]=Variabel
        img.src = `Bilder/sorte/${sorte}.png`;
        EisdealerSimulator.sorteImages.set(sorte, img);
    }
    // Bilder Smileys 
    EisdealerSimulator.moodImages = new Map();
    for (let mood of ['cool', 'neutral', 'annoyed', 'angry']) {
        // Bilder werden erzeugt
        let img = new Image();
        // Pfad, wo sich die Bilder für Smileys befinden, ${]=Variabel
        img.src = `Bilder/mood/${mood}.png`;
        EisdealerSimulator.moodImages.set(mood, img);
    }
})(EisdealerSimulator || (EisdealerSimulator = {}));
