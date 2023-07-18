// Eisdealer-Simulator
// Penelope Vogel, 270002, MKB2
// In Zusammenarbeit mit Julia Mamani, Evelin Sinner, Anna-Lena Jörger

namespace EisdieleSimulator{

    // imporitert die Sorte-Bilder
    import sorteImages = EisdealerSimulator.sorteImages;

    // Klasse von Eisbucket und erbt Methoden und Eigenschaften von Entity
    export class IceBucket extends Entity{

        // Consructor nimmt Y und X von außen entgegen
        constructor(initX: number, initY: number, public sorte: Sorte) {
            super(initX, initY);
        }

        // Funktion fürs zeichnen
        render(){
            //positioniert(malt) die Eissorten an deren Plätzen
            // sauceImages.get nimmt sich die Bilder von der Variabel bei Images.ts
            ctx.drawImage(sorteImages.get(this.sorte), this.pos.x, this.pos.y, 40, 40);
            // wenn Bild ausgewählt wird, dann rote Outline um den Bild herum, damit User versteht, dass er Bild angeklickt hat
            if(this.selected){
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.rect(this.pos.x -5, this.pos.y-5, 50, 50);
                ctx.stroke();
            }
            // Text unter den Eissorten
            ctx.fillStyle = "black";
            ctx.font = "12px Arial";
            ctx.fillText(this.sorte, this.pos.x-2, this.pos.y+50);
        }
    }
}
