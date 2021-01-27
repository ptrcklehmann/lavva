// canvas setup
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
WebFont.load({
    google: {
      families: ['Balsamiq Sans']
    }
  });
ctx.font = '50px Balsamiq Sans'
let score = 0
let gameFrame = 0

// var granimInstance = new Granim({
//     element: '#canvas',
//     name: 'background-animation',
//     direction: 'top-bottom',
//     opacity: [1, 1],
//     isPausedWhenNotInView: true,
//     states : {
//       "default-state": {
//           gradients: [
//               ['#e74c3c', '#ffffff'],
//               ['#ffffff', '#e74c3c']
//           ]
//     }
// }})


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
var svg2 = document.getElementById('blob2');
var svgData2 = new XMLSerializer().serializeToString(svg2);
var encodedData2 = window.btoa(unescape(encodeURIComponent(svgData2)));
var newSrc2 = 'data:image/svg+xml;base64,'+encodedData2;

const img2 = new Image()
img2.src = newSrc2



//player
const img = new Image()
img.src = newSrc
const player = new Player(img)
console.log(img, img2)

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
            //    blobsArray.splice(i, 1)
                
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
