class Gem {
    constructor() {
        this.x = Math.random() * canvas.width
        this.y = 0 //
        this.lenght = randomBetween(100, 350)
        this.gemsArray = []
        this.radius = randomBetween(30, 60)
        this.speed = Math.random() * 2 + 1
        this.distance
        this.counted = false
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2'
   
    }
    getRandomX() {
            if (randomBetween(1,2) == 1) {
                this.x = 0
            } else {
                this.x = canvas.width
            }
    }
   
    update() {
        this.y += this.speed
        const dx = this.x - player.x
        const dy = this.y - player.y
        this.distance = Math.sqrt(dx*dx + dy*dy)
    }
    draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, 250, 40);
        ctx.stroke()
    }
}