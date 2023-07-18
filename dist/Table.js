"use strict";
// Eisdealer-Simulator
// Penelope Vogel, 270002, MKB2
// In Zusammenarbeit mit Julia Mamani, Evelin Sinner, Anna-Lena Jörger
var EisdieleSimulator;
(function (EisdieleSimulator) {
    // Table
    class Table extends EisdieleSimulator.Entity {
        // Chair-Array
        chairs = [];
        constructor(initX, initY) {
            super(initX, initY);
            // Chair Coordinate: Table Coordinate minus 30 -> Position of Chair
            // Stuhl-Koordinate: Tisch-Koordinate minus 30 ergibt Koordinate des Stuhls
            let distance = 30;
            // Neuen Stuhl erstellen
            this.chairs.push(new Chair(this.pos.x - distance, this.pos.y));
        }
        // Jedes Objekt hat eine Renderfunktion, so dass das Objekt gezeichnet werden kann
        // Tisch zeichnen
        render() {
            // Farbe Schwarz
            EisdieleSimulator.ctx.fillStyle = "black";
            EisdieleSimulator.ctx.beginPath();
            // Kreis
            EisdieleSimulator.ctx.arc(this.pos.x, this.pos.y, 20, 0, 2 * Math.PI);
            EisdieleSimulator.ctx.fill();
            // Render Chair
            for (let chair of this.chairs) {
                chair.render();
            }
        }
    }
    EisdieleSimulator.Table = Table;
    class Chair extends EisdieleSimulator.Entity {
        // Ein Stuhl kann von Kunde besetzt werden
        // Standardmäßig auf null, also unbesetzt
        customer = null;
        constructor(initX, initY) {
            super(initX, initY);
        }
        // Render-Funktion
        // Zeichne Stuhl auf Canvas über RenderingContext
        render() {
            // Kreis mit Radius von 10
            let radius = 10;
            // Farbe Grün
            EisdieleSimulator.ctx.fillStyle = "green";
            // Pfad beginnt
            EisdieleSimulator.ctx.beginPath();
            // Arc -> Kreis und die Positionszuweisung 
            EisdieleSimulator.ctx.arc(this.pos.x, this.pos.y, radius, 0, 2 * Math.PI);
            EisdieleSimulator.ctx.fill();
        }
    }
    EisdieleSimulator.Chair = Chair;
})(EisdieleSimulator || (EisdieleSimulator = {}));
