class Spikes {
    constructor(x, y,width,height) {
        var option = {
        isStatic:true,
        density:20,
        friction:1.3
        }
        this.body = Bodies.rectangle(x, y,width,height, option);
        this.width = width;
        this.height = height;
        World.add(myWorld, this.body)
    }
    display() {
        var pos = this.body.position;
    
        rectMode(CENTER)
        strokeWeight(3)
        stroke("red")
        fill("red")
        rect(pos.x,pos.y, this.width, this.height)                           
    }
}