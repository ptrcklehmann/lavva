class Player {
    constructor(img){
        this.x = canvas.width
        this.y = canvas.height/2
        this.radius = 90
        this.image = img
    }
    update() {
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        if (mouse.x != this.x) {
            this.x -= dx/40
        } 
        if (mouse.y != this.y) {
            this.y -= dy/40
        } 
    }
    draw() {
        //ctx.fillStyle = 'plum'
        //ctx.beginPath()
        ctx.filter = "url('#goo')"
        ctx.drawImage(this.image, this.x-40, this.y-40, this.radius, this.radius)
        //ctx.filter()
       // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
       // ctx.fill()
        // ctx.closePath()
        //ctx.fillRect(this.x, this.y, this.radius, 10)
    }
}
