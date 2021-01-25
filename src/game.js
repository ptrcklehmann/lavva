class Game {
    constructor() {

    }
    draw(){
        for(let i = 0; i < 5; i++) {
            const t = TweenMax.to(select('.blob' + i), randomBetween(5, 10), {
            y: 30,
            repeat: -1,
            repeatDelay:randomBetween(1, 9),
            yoyo:true,
            ease:Linear.ease,
          })
          
          timeline.add(t, (i+1)/1.9)
        }
    }
}