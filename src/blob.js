class Blob {
    constructor() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + 100 
        this.radius = 50
        this.speed = Math.random() * 5 + 1
        this.distance
        this.counted = false
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2'
    }
    update() {
        this.y -= this.speed
        const dx = this.x - player.x
        const dy = this.y - player.y
        this.distance = Math.sqrt(dx*dx + dy*dy)
    }
    draw() {
        ctx.fillStyle = 'rosybrown'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2)
        ctx.fill()
        ctx.closePath()
        ctx.stroke()
    }
}