"use strict";
// Eisdealer-Simulator
// Penelope Vogel, 270002, MKB2
// In Zusammenarbeit mit Julia Mamani, Evelin Sinner, Anna-Lena Jörger
var EisdieleSimulator;
(function (EisdieleSimulator) {
    // Objekt das x und y-Koordinate speichert
    class Vector {
        x;
        y;
        // Konstruktor nimmt x- und y-Werte von außen entgegen. Daraus ergibt sich Position.
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        // Erzeugte Distanz (z.B. Distanz zwischen Mausklick und Objekt)
        distanceTo(vec) {
            return Math.sqrt(Math.pow(vec.x - this.x, 2) + Math.pow(vec.y - this.y, 2));
        }
    }
    EisdieleSimulator.Vector = Vector;
})(EisdieleSimulator || (EisdieleSimulator = {}));
