// canvas setup
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
canvas.width = 600;
canvas.height = canvas.clientHeight;

let score = 0
let gameFrame = 0
ctx.font = '40pt Baloo Bhaina 2'
//mouse interactivity

let canvasPosition = canvas.getBoundingClientRect()
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener('mousedown', event => {
    mouse.click = true
    mouse.x = event.x - canvasPosition.left
    mouse.y = event.y - canvasPosition.top
})
canvas.addEventListener('mouseup', () => {
    mouse.click = false
})
//player
const player = new Player()


//blobs
const blobsArray = []
function handleBlobs() {
    if(gameFrame % 50 == 0) {
        blobsArray.push(new Blob())
    }
    for(let i = 0; i < blobsArray.length; i++) {
        blobsArray[i].update()
        blobsArray[i].draw()
    }
    for(let i = 0; i < blobsArray.length; i++) {
        if(blobsArray[i].y < 0 - blobsArray[i].radius * 2) {
            blobsArray.splice(i, 1)
        }
        if(blobsArray[i].distance < blobsArray[i].radius + player.radius) {
            if(blobsArray[i].counted == false) {
                score++
                blobsArray[i].counted = true;
                (blobsArray[i].sound == 'sound1') ? blobPop1.play() : blobPop2.play()
                blobsArray.splice(i, 1)
            }
        }
    }
}

//sounds 
const blobPop1 = document.createElement('audio')
blobPop1.src = 'assets/sounds/lava.ogg'

const blobPop2 = document.createElement('audio')
blobPop2.src = 'assets/sounds/lava2.ogg'

//animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    player.draw()
    ctx.fillText('score: ' + score, 10, 20)
    gameFrame++
    handleBlobs()
    requestAnimationFrame(animate)
}
animate()