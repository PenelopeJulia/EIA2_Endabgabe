// Eisdealer-Simulator
// Penelope Vogel, 270002, MKB2
// In Zusammenarbeit mit Julia Mamani, Evelin Sinner, Anna-Lena Jörger

namespace EisdieleSimulator{

    // Sauce-Bilder werden importiert
    import sauceImages = EisdealerSimulator.sauceImages;

    // Klasse von SauceBucket und erbt Methoden und Eigenschaften von Entity
    export class SauceBucket extends Entity{

        // Consructor nimmt Y und X von außen entgegen
        constructor(initX: number, initY: number, public sauce: Sauce) {
            super(initX, initY);
        }

        // Funktion fürs zeichnen
        render(){
            // positioniert(malt) die Soße an deren Plätzen
            // sauceImages.get nimmt sich die Bilder von der Variabel bei Images.ts
            ctx.drawImage(sauceImages.get(this.sauce), this.pos.x, this.pos.y, 40, 40);
            // wenn Bild ausgewählt wird, dann rote Outline um den Bild herum, damit User versteht, dass er Bild angeklickt hat
            if(this.selected){
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.rect(this.pos.x -5, this.pos.y-5, 50, 50);
                ctx.stroke();
            }
            // Text unter den Soßen
            ctx.fillStyle = "black";
            ctx.font = "12px Arial";
            ctx.fillText(this.sauce, this.pos.x-5, this.pos.y+50);
        }
    }
}
