class Blob {
    constructor(img) {
        this.x = Math.random() * canvas.width
        this.y = 0 - 100 //
        this.radius = randomBetween(50, 120)
        this.speed = Math.random() * 2 + 1
        this.distance
        this.counted = false
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2'
        this.image = img
   
    }
    update() {
        this.y += this.speed
        const dx = this.x - player.x
        const dy = this.y - player.y
        this.distance = Math.sqrt(dx*dx + dy*dy)
    }
    draw() {
        ctx.filter = "url('#goo')"
        ctx.drawImage(this.image, this.x+40, this.y+40, this.radius, this.radius)
    }
}