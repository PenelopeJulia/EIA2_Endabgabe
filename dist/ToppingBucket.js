"use strict";
// Eisdealer-Simulator
// Penelope Vogel, 270002, MKB2
// In Zusammenarbeit mit Julia Mamani, Evelin Sinner, Anna-Lena Jörger
var EisdieleSimulator;
(function (EisdieleSimulator) {
    var toppingImages = EisdealerSimulator.toppingImages;
    // Klasse von ToppingBucket und erbt Methoden und Eigenschaften von Entity
    class ToppingBucket extends EisdieleSimulator.Entity {
        topping;
        constructor(initX, initY, topping) {
            super(initX, initY);
            this.topping = topping;
        }
        // Funktion fürs Zeichnen
        render() {
            // positioniert(malt) die Toppings an deren Plätzen
            // sauceImages.get nimmt sich die Bilder von der Variabel bei Images.ts
            EisdieleSimulator.ctx.drawImage(toppingImages.get(this.topping), this.pos.x, this.pos.y, 40, 40);
            // wenn Bild ausgewählt wird, dann rote Outline um den Bild herum, damit User versteht, dass er Bild angeklickt hat
            if (this.selected) {
                EisdieleSimulator.ctx.beginPath();
                EisdieleSimulator.ctx.strokeStyle = "red";
                EisdieleSimulator.ctx.rect(this.pos.x - 5, this.pos.y - 5, 50, 50);
                EisdieleSimulator.ctx.stroke();
            }
            // Text unter den Eissorten
            EisdieleSimulator.ctx.fillStyle = "black";
            EisdieleSimulator.ctx.font = "12px Arial";
            EisdieleSimulator.ctx.fillText(this.topping, this.pos.x - 5, this.pos.y + 50);
        }
    }
    EisdieleSimulator.ToppingBucket = ToppingBucket;
})(EisdieleSimulator || (EisdieleSimulator = {}));
