class Gem {
    constructor() {
        this.x = Math.random() * canvas.width
        this.y = 0 //
        this.gemsArray = []
        this.radius = randomBetween(40, 80)
        this.speed = Math.random() * 2 + 2
        this.distance
        this.counted = false
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2'
   
    }
   
    update() {
        this.y += this.speed
        const dx = this.x - player.x
        const dy = this.y - player.y
        this.distance = Math.sqrt(dx*dx + dy*dy)
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = warningGrad;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        ctx.fill()
    }
}