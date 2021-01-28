// canvas setup
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

ctx.font = '50px Balsamiq Sans'
//colours
const gradient = ctx.createLinearGradient(10, 0, 500, 0);
gradient.addColorStop(0, 'red');
gradient.addColorStop(1 / 6, '#FF0005');
gradient.addColorStop(2 / 6, '#FF0012');
gradient.addColorStop(3 / 6, '#FF0029');
gradient.addColorStop(4 / 6, '#FF0049');
gradient.addColorStop(5 / 6, '#FF0072');
gradient.addColorStop(1, '#FF00A4');

let score = 0
let gameFrame = 0

const game = new Game()

//mouse interactivity
let canvasPosition = canvas.getBoundingClientRect()
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener('mousedown', e => {
    mouse.click = true
    mouse.x = e.x - canvasPosition.left
    mouse.y = e.y - canvasPosition.top
    console.log(mouse.y)
})
canvas.addEventListener('mouseup', () => {
    mouse.click = false
})


//sounds 
const blobPop1 = document.createElement('audio')
blobPop1.src = 'assets/sounds/lava.ogg'
const blobPop2 = document.createElement('audio')
blobPop2.src = 'assets/sounds/lava2.ogg'

//blobs
const blobsArray = []

function handleBlobs() {
    for(let i = 0; i < blobsArray.length; i++) {
        blobsArray[i].update()
        blobsArray[i].draw()
    }
    if(gameFrame % 100 == 0) {
        blobsArray.push(new Blob())
    }
    for(let i = 0; i < blobsArray.length; i++) {
        if(blobsArray[i].y < 0 - blobsArray[i].radius * 2) {
            blobsArray.splice(i, 1)
        }
    }
    for(let i = 0; i < blobsArray.length; i++) {
        if(blobsArray[i].distance < blobsArray[i].radius/2 + player.radius/2) {
            if(!blobsArray[i].counted) {
                score++
                blobsArray[i].counted = true;
                (blobsArray[i].sound == 'sound1') ? blobPop1.play() : blobPop2.play()
                blobsArray.splice(i, 1)
                player.radius += 2
            }
        }
    }
}    

//player
const player = new Player()

//obstacles 
const gemsArray = []
function handleObstacles() {
    if(gameFrame % 400 == 0) {
        gemsArray.push(new Gem())
    }
    for(let i = 0; i < gemsArray.length; i++) {
        gemsArray[i].update()
        gemsArray[i].draw()
    }
    for(let i = 0; i < gemsArray.length; i++) {
    if(gemsArray[i].distance < gemsArray[i].radius/2 + player.radius/2) {
        if(!gemsArray[i].counted) {
            score--
            gemsArray[i].counted = true
            player.radius -= 5
        }
    }
}

}


//animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    handleBlobs()
    handleObstacles()
    player.update()
    player.draw()
    gameFrame += 1
    requestAnimationFrame(animate)
}
animate()

function randomBetween(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
    mouse.x = canvas.width/2;
    mouse.y = canvas.height/2;
  });
