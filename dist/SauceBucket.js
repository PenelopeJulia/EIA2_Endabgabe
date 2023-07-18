"use strict";
// Eisdealer-Simulator
// Penelope Vogel, 270002, MKB2
// In Zusammenarbeit mit Julia Mamani, Evelin Sinner, Anna-Lena Jörger
var EisdieleSimulator;
(function (EisdieleSimulator) {
    // Sauce-Bilder werden importiert
    var sauceImages = EisdealerSimulator.sauceImages;
    // Klasse von SauceBucket und erbt Methoden und Eigenschaften von Entity
    class SauceBucket extends EisdieleSimulator.Entity {
        sauce;
        // Consructor nimmt Y und X von außen entgegen
        constructor(initX, initY, sauce) {
            super(initX, initY);
            this.sauce = sauce;
        }
        // Funktion fürs zeichnen
        render() {
            // positioniert(malt) die Soße an deren Plätzen
            // sauceImages.get nimmt sich die Bilder von der Variabel bei Images.ts
            EisdieleSimulator.ctx.drawImage(sauceImages.get(this.sauce), this.pos.x, this.pos.y, 40, 40);
            // wenn Bild ausgewählt wird, dann rote Outline um den Bild herum, damit User versteht, dass er Bild angeklickt hat
            if (this.selected) {
                EisdieleSimulator.ctx.beginPath();
                EisdieleSimulator.ctx.strokeStyle = "red";
                EisdieleSimulator.ctx.rect(this.pos.x - 5, this.pos.y - 5, 50, 50);
                EisdieleSimulator.ctx.stroke();
            }
            // Text unter den Soßen
            EisdieleSimulator.ctx.fillStyle = "black";
            EisdieleSimulator.ctx.font = "12px Arial";
            EisdieleSimulator.ctx.fillText(this.sauce, this.pos.x - 5, this.pos.y + 50);
        }
    }
    EisdieleSimulator.SauceBucket = SauceBucket;
})(EisdieleSimulator || (EisdieleSimulator = {}));
