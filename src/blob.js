class Blob {
    constructor() {
        this.x = Math.random() * canvas.width
        this.y = 0 //
        this.blobsArray = []
        this.radius = randomBetween(25, 45)
        this.speed = Math.random() * 2 + 1
        this.distance
        this.counted = false
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2'
        this.pop = false
   
    }
   
    update() {
        this.y += this.speed
        const dx = this.x - player.x
        const dy = this.y - player.y
        this.distance = Math.sqrt(dx*dx + dy*dy)
    }
    draw() {
        
        ctx.beginPath()
        ctx.fillStyle = blobGrad;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        ctx.fill()
    }
}