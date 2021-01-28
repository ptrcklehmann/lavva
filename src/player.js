class Player {
    constructor(){
        this.x = canvas.width/2
        this.y = canvas.height
        this.radius = 50

    }
    update() {
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        if (mouse.x != this.x) {
            this.x -= dx/50
        } 
        if (mouse.y != this.y) {
            this.y -= dy/50
        } 
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }
}
