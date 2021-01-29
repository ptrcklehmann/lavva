// canvas setup
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const playGame = { value: false }
const wrapper = document.querySelector('.canvasWrapper')
const mainScreen = document.querySelector('.mainScreen')



//score element
let score = 0
let gameFrame = 0
const scoreCount = document.querySelector('.scoreCount')


//colours
const blobGrad = ctx.createLinearGradient(10, 0, 500, 0);
blobGrad.addColorStop(0, 'red');
blobGrad.addColorStop(1 / 6, '#FF0005');
blobGrad.addColorStop(2 / 6, '#FF0012');
blobGrad.addColorStop(3 / 6, '#FF0029');
blobGrad.addColorStop(4 / 6, '#FF0049');
blobGrad.addColorStop(5 / 6, '#FF0072');
blobGrad.addColorStop(1, '#FF00A4');

const warningGrad = ctx.createLinearGradient(10, 0, 500, 0)
warningGrad.addColorStop(0, 'yellow');
warningGrad.addColorStop(1 / 6, '#FFFF87');
warningGrad.addColorStop(2 / 6, '#EFEFA7');
warningGrad.addColorStop(3 / 6, '#D5D4AE');
warningGrad.addColorStop(4 / 6, '#FFFA15');
warningGrad.addColorStop(5 / 6, '#DFDD60');
warningGrad.addColorStop(1, '#FFF04C');



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
    console.log(mouse.y)
})
canvas.addEventListener('mouseup', () => {
    mouse.click = false
})


//sounds 
const blobPop = document.createElement('audio')
blobPop.src = 'assets/sounds/blop.wav'

const alertSound = document.createElement('audio')
alertSound.src = 'assets/sounds/alert.mp3'

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
                blobPop.play()
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
    if(gemsArray[i].distance < gemsArray[i].radius + player.radius) {
        if(!gemsArray[i].counted) {
            score -= 5
            gemsArray[i].counted = true
            player.radius -= 5
            alertSound.play()
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
    scoreCount.innerHTML = score
    requestAnimationFrame(animate)  
}
wrapper.addEventListener('click',  () => {
    if(playGame.value == false) {
        mainScreen.classList.add('hide')
        playGame.value = true
        animate()
    }
})


function randomBetween(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
    mouse.x = canvas.width/2;
    mouse.y = canvas.height/2;
  });
