// canvas setup
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
canvas.width = 600;
canvas.height = canvas.clientHeight;
ctx.font = '40px Baloo Bhaina 2'
let score = 0
let gameFrame = 0
let xmlns = "http://www.w3.org/2000/svg", xlinkns = "http://www.w3.org/1999/xlink",   
  select = function(s) {
    return document.querySelector(s)
  },
  selectAll = function(s) {
    return document.querySelectorAll(s)
  }
//   container = select('.container'),
//   mainSVG = select('.mainSVG')
//   TweenMax.set('svg', {
//   visibility: 'visible'
// })
let timeline = new TimelineMax()

const game = new Game()

//mouse interactivity
let canvasPosition = canvas.getBoundingClientRect()
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
canvas.addEventListener('mousemove', e => {
    mouse.click = true
    mouse.x = e.x - canvasPosition.left
    mouse.y = e.y - canvasPosition.top
})
canvas.addEventListener('mouseup', () => {
    mouse.click = false
})

//player
const img = new Image()
img.src = './assets/img/blob0.svg'
const player = new Player(img)

//sounds 
const blobPop1 = document.createElement('audio')
blobPop1.src = 'assets/sounds/lava.ogg'
const blobPop2 = document.createElement('audio')
blobPop2.src = 'assets/sounds/lava2.ogg'

//blobs

const img1 = new Image()
img1.src = './assets/img/blob0.svg'
const blobsArray = []
function handleBlobs() {
    if(gameFrame % 50 == 0) {
        blobsArray.push(new Blob(img1))
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

function randomBetween(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}
window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
    mouse.x = canvas.width/2;
    mouse.y = canvas.height/2;
})