// canvas setup
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

ctx.font = '50px Balsamiq Sans'
var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop("0", "#FF00A5");
gradient.addColorStop("0.5", "#FF00A4");
gradient.addColorStop("1.0", "#FF0049");
ctx.fillStyle = gradient
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
var svg = document.getElementById('blob');
var svgData = new XMLSerializer().serializeToString(svg);
var encodedData = window.btoa(unescape(encodeURIComponent(svgData)));
var newSrc = 'data:image/svg+xml;base64,'+encodedData;

const img2 = new Image()
img2.src = newSrc


//player
const img = new Image()
img.src = newSrc
const player = new Player(img)


const blobsArray = []
function handleBlobs() {
    if(gameFrame % 60 == 0) {
        blobsArray.push(new Blob(img2))
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
                player.radius += 1
                
            }
        }
    }
}

//animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    player.draw()
    ctx.fillText('score: ' + score, 20, 50)
    gameFrame++
    handleBlobs()
    requestAnimationFrame(animate)
}
animate()

function randomBetween(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}
