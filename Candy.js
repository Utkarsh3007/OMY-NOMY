class Candy {
    constructor(x, y,radius) {
        var option = {
        isStatic:false,
        density:17,
        resititution:1,
        }
        this.body = Matter.Bodies.circle(x, y,radius, option);
        this.body.radius=radius
        this.image=loadImage("candy.png")
        World.add(myWorld, this.body);
    }
    display() {
        var pos = this.body.position;
        var angle= this.body.angle;

        push();
        translate(pos.x,pos.y)
        rotate(angle)
        imageMode(CENTER)
        fill("purple")
        image(this.image,0,0,50,50)                           
        pop();
    }
}