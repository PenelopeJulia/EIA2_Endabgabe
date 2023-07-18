"use strict";
// Eisdealer-Simulator
// Penelope Vogel, 270002, MKB2
// In Zusammenarbeit mit Julia Mamani, Evelin Sinner, Anna-Lena Jörger
var EisdieleSimulator;
(function (EisdieleSimulator) {
    // Bilder werden importiert
    var sauceImages = EisdealerSimulator.sauceImages;
    var moodImages = EisdealerSimulator.moodImages;
    var toppingImages = EisdealerSimulator.toppingImages;
    var sorteImages = EisdealerSimulator.sorteImages;
    // Klasse von Customer und erbt Methoden und Eigenschaften von Entitaet
    class Customer extends EisdieleSimulator.Entity {
        sauce;
        topping;
        ice;
        angebotName;
        angebotPrice;
        // Target des Customers ist ein leerer Stuhl
        target = null;
        // Status des Customer
        status = 'enter';
        // InitialStimmung des Kunden: Cool
        mood = 'cool';
        // Sauce, Topping und Eis, welche der Kunde will 
        // Werden später gefüllt, wenn Angebot bestellt und erhalten wurde
        givenSauce = null;
        givenTopping = null;
        givenIce = [];
        // Beginn des Wartens von Customer
        waitingTimeStart = null;
        constructor(initX, initY, sauce, topping, ice, angebotName, angebotPrice) {
            super(initX, initY);
            this.sauce = sauce;
            this.topping = topping;
            this.ice = ice;
            this.angebotName = angebotName;
            this.angebotPrice = angebotPrice;
        }
        // Steuert die Reaktionen des Customer
        move() {
            if (!this.target) {
                return;
            }
            // Stimmung ändert sich von Customer, wenn er wartet
            // Bis zu 20s noch normal
            if (this.status === "waiting" && this.waitingTimeStart) {
                if (this.waitingTimeStart.getTime() + 20000 < Date.now()) {
                    this.mood = "neutral";
                }
                // Wenn er bis zu 40s warten muss, wird Customer genervt
                if (this.waitingTimeStart.getTime() + 40000 < Date.now()) {
                    this.mood = "annoyed";
                }
            }
            // Customer betritt Eisdiele
            if (this.status === "enter") {
                // Customer wird positioniert
                this.pos = new EisdieleSimulator.Vector(this.target.pos.x - 20, this.target.pos.y - 20);
                this.status = "waiting";
                this.waitingTimeStart = new Date();
            }
            // Customer verlässt Eisdiele
            if (this.status === "exit") {
            }
        }
        // Objekt Kundi wird auf der Leinwand (Canva) gezeichnet bzw dargestellt basierend auf seine Eigenschaften
        render() {
            this.move();
            // Mood Images werden von Images.ts entnommen
            let moodImage = moodImages.get(this.mood);
            // Wenn Bild nicht gefunden wird, dann kommt Error
            if (!moodImage) {
                throw new Error("mood not found");
            }
            // Bilder werden an die Positionen eingefügt
            EisdieleSimulator.ctx.drawImage(moodImage, this.pos.x, this.pos.y, 40, 40);
            EisdieleSimulator.ctx.fillStyle = "black";
            EisdieleSimulator.ctx.font = '18px Arial';
            EisdieleSimulator.ctx.fillText(this.angebotName, this.pos.x - 10, this.pos.y - 5);
            // Überprüfung, ob User dem Customer die gewünschte Sauce gibt
            if (this.sauce !== this.givenSauce) {
                EisdieleSimulator.ctx.drawImage(sauceImages.get(this.sauce), this.pos.x - 15, this.pos.y + 5, 20, 20);
            }
            // Überprüfung, ob User dem Customer die gewünschte Topping gibt
            if (this.topping !== this.givenTopping) {
                EisdieleSimulator.ctx.drawImage(toppingImages.get(this.topping), this.pos.x - 15, this.pos.y + 27, 20, 20);
            }
            // Überprüfung, ob User dem Customer die gewünschte Sorte(n) gibt
            let i = 0;
            for (let sorte of this.ice) {
                if (this.givenIce.indexOf(sorte) === -1) {
                    EisdieleSimulator.ctx.drawImage(sorteImages.get(sorte), this.pos.x + 35, this.pos.y + (i++ * 15), 15, 15);
                }
            }
        }
    }
    EisdieleSimulator.Customer = Customer;
})(EisdieleSimulator || (EisdieleSimulator = {}));
