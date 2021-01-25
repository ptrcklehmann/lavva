class Player {
    constructor(img){
        this.x = canvas.width
        this.y = canvas.height/2
        this.radius = 50
        this.angle = 0
        this.frameX = 0
        this.frameY = 0
        this.frame = 0
        this.image = img
    }
    update() {
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        if (mouse.x != this.x) {
            this.x -= dx/30
        } 
        if (mouse.y != this.y) {
            this.y -= dy/30
        } 
    }
    draw() {
        
        if(mouse.click) {
            ctx.lineWidth = 0.2
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(mouse.x, mouse.y)        
        }
        //ctx.fillStyle = 'plum'
        //ctx.beginPath()
        ctx.drawImage(this.image, this.x-20, this.y-25, 80, 80)
       // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
       // ctx.fill()
      //  ctx.closePath()
        //ctx.fillRect(this.x, this.y, this.radius, 10)
    }
}
