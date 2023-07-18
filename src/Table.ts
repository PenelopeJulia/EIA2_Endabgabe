// Eisdealer-Simulator
// Penelope Vogel, 270002, MKB2
// In Zusammenarbeit mit Julia Mamani, Evelin Sinner, Anna-Lena Jörger

namespace EisdieleSimulator{

    // Table
    export class Table extends Entity {

        // Chair-Array
        chairs: Chair[] = []

        constructor(initX: number, initY: number) {
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
            ctx.fillStyle = "black";
            ctx.beginPath();
            // Kreis
            ctx.arc(this.pos.x, this.pos.y, 20, 0, 2 * Math.PI);
            ctx.fill()
            // Render Chair
            for(let chair of this.chairs){
                chair.render();
            }
        }
    }

    export class Chair extends Entity {
        // Ein Stuhl kann von Kunde besetzt werden
        // Standardmäßig auf null, also unbesetzt
        customer: Customer | null = null;

        constructor(initX: number, initY: number) {
            super(initX, initY);
        }

        // Render-Funktion
        // Zeichne Stuhl auf Canvas über RenderingContext
        render(){
            // Kreis mit Radius von 10
            let radius = 10;
            // Farbe Grün
            ctx.fillStyle = "green";
            // Pfad beginnt
            ctx.beginPath();
            // Arc -> Kreis und die Positionszuweisung 
            ctx.arc(this.pos.x, this.pos.y, radius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }


}
