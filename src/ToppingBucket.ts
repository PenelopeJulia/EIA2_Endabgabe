// Eisdealer-Simulator
// Penelope Vogel, 270002, MKB2
// In Zusammenarbeit mit Julia Mamani, Evelin Sinner, Anna-Lena Jörger

namespace EisdieleSimulator{

    import toppingImages = EisdealerSimulator.toppingImages;

    // Klasse von ToppingBucket und erbt Methoden und Eigenschaften von Entity
    export class ToppingBucket extends Entity{

        constructor(initX: number, initY: number, public topping: Topping) {
            super(initX, initY);
        }

        // Funktion fürs Zeichnen
        render(){
            // positioniert(malt) die Toppings an deren Plätzen
            // sauceImages.get nimmt sich die Bilder von der Variabel bei Images.ts
            ctx.drawImage(toppingImages.get(this.topping), this.pos.x, this.pos.y, 40, 40);
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
            ctx.fillText(this.topping, this.pos.x-5, this.pos.y+50);
        }
    }
}
