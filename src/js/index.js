import "./import/modules";

    
document.addEventListener('DOMContentLoaded', ()=> {
    // 
    let 
    wrapper = document.getElementById('wrapper'),
    positions = ['0', '-100vw', '-100vw, -100vh', '-200vw, -100vh'],
    page = 0,
    mouseCheck = false, //Mouse events trigger
    circlePositionTop = 0,
    circlePositionLeft = 0,

    //Variables for swiping
    maxSwipeTime = 1500, //Max time for swipe
    swipeRange = 30, //Min distance for swiping
    swipeHeight,
    startTime,
    endTime,
    swipeX,
    swipeY;




//Events

window.addEventListener("wheel", (e)=> {

    if (e.deltaY < 0) {
        scrollingPage(true); //Scrolling up
        console.log('top')
    }
    if (e.deltaY > 0) {
        scrollingPage(); //Scrolling down
        console.log('bot')
    }
});

//Mouse slider
document.addEventListener('touchstart', (e)=> {
    let touchObj = e.changedTouches[0];
    startTime = new Date().getTime();
    swipeX = touchObj.pageX;
    swipeY = touchObj.pageY;
    swipeHeight = 0;

    if(e.preventDefault) {
        e.preventDefault();
    }
});
document.addEventListener('touchmove', (e)=> {
    if(e.preventDefault) {
        e.preventDefault();
    }
});
document.addEventListener('touchend', (e)=> {
    swipeEnd(e)
    if(e.preventDefault) {
        e.preventDefault();
    }
});


//Functions 
function scrollingPage(direction) {
    if(direction) {
        if(page > 0) {
            page--;
            console.log(page + '!top!')
        } 
    } else {
        if(page < 3) {
            page++;
            console.log(page + '!bot!')
        } 
    }
    document.getElementById('html').style.fontSize = page > 0 ? '1.2px' : '10px';
    console.log(page + "s" + positions[page])   
    wrapper.style.transform = `translate(${positions[page]})`;
} 



function swipeEnd(e) {
    let touchObj = e.changedTouches[0];
        swipeHeight = touchObj.pageY - swipeY;
        endTime = new Date().getTime() - startTime; 

    if(endTime <= maxSwipeTime && Math.abs(touchObj.pageX - swipeX) <= 100) {
        if(swipeHeight >= swipeRange) {
            scrollingPage(true);
        } else if(swipeHeight <= -swipeRange) {
            scrollingPage();
        }     
    }
}





});

