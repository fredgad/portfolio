import "./import/modules";

    
document.addEventListener('DOMContentLoaded', ()=> {
    // 
    let 
    wrapper = document.getElementById('wrapper'),
    positions = ['0', '-100vw', '-100vw, -100vh', '-200vw, -100vh'],
    width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    page = 0,
    mouseCheck = false, //Mouse events trigger
    wheelCheckTop = true,
    secondWheelCheckTop = false,
    wheelCheckBot = true,
    secondWheelCheckBot = false,
    circle = document.querySelector('.field'),
    aboutMe = document.querySelector('.about__menu_about-me'),
    skills = document.querySelector('.about__menu_skills'),
    experience = document.querySelector('.about__menu_experience'),
    contacts = document.querySelector('.about__menu_contacts'),
    aboutMenu = document.querySelector('.about__menu'), 
    circlePositionTop = aboutMe.getBoundingClientRect().top,
    circlePositionLeft = aboutMe.getBoundingClientRect().left - width,
    circleObject = aboutMe.getBoundingClientRect().height,
    circleSize = width > 1270 ? 10 : width > 768 ? 9 : width > 499 ? 7 : 6,

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
    wheelChacking(e)
});

function wheelChacking(e) {
    if (e.deltaY < 0) {
        if(wheelCheckTop) {
            scrollingPage(true); //Scrolling up
            wheelCheckTop = false;
            setTimeout(()=> {
                wheelCheckTop = true;
            }, 500);
        }
    }
    if (e.deltaY > 0) {
        if(wheelCheckBot) {
            scrollingPage(); //Scrolling down
            wheelCheckBot = false;
            setTimeout(()=> {
                wheelCheckBot = true;
            }, 500);
        }
    }
}
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

//Circle position event
aboutMenu.addEventListener('mouseover', (e)=> {
    if(e.target.classList.contains('element')) {
        circlePositionTop = e.target.getBoundingClientRect().top;
        circlePositionLeft = e.target.getBoundingClientRect().left;
        changePosition();
    }
});


//Functions 
function scrollingPage(direction) {
    if(direction) {
        if(page > 0) {
            page--;
        } 
    } else {
        if(page < 3) {
            page++;
        } 
    }
    
    wrapper.style.transform = `translate(${positions[page]})`;
    circleChangeSize();
    changePosition();
} 

function changePosition() {
    if(page === 1) {
        circle.style.top = circlePositionTop + 15 + 'px';
        circle.style.left = circlePositionLeft - 35 + 'px';
        setTimeout(()=> {
            circle.style.top = circlePositionTop + 15 + 'px';
            circle.style.left = circlePositionLeft - 35 + 'px';
        },500);
    } else if(page === 2) {
        circle.style.top = '10vh';
        circle.style.left = '50vw';
    } else {
        circle.style.top = '50vh';
        circle.style.left = '50vw';
    }
}

let size = circleSize;
function circleChangeSize() {
    if(page === 0){
        if(size < circleSize) {
            size += .05; 
        }else {
            return;
        }
    }else if(page === 1) {
        if(size > 1.2) {
            size -= .05;   
        } else {
            return;
        }
    }else {
        if(size < 3) {
            size += .05; 
        }else {
            return;
        }
    }
    document.getElementById('html').style.fontSize = size + 'px'

    window.requestAnimationFrame(circleChangeSize);
    window.requestAnimationFrame(circleChangeSize);
    
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

