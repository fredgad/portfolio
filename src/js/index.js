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
    swipingCheck = true,
    pages = document.getElementById('pages').children,
    footerHead = document.querySelector('#works > h2'),
    circle = document.querySelector('.field'),
    aboutMe = document.querySelector('.about__menu_about-me'),
    lines = document.querySelectorAll('.line'),
    skillsCont = document.querySelector('.skills__cont'),
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
    circle.style.transition = '2s';
    wheelChacking(e)
});
skillsCont.addEventListener('mouseover', (e)=> {
    swipingCheck = false;
});
skillsCont.addEventListener('mouseleave', (e)=> {
    swipingCheck = true;
});
skillsCont.addEventListener('mouseout', (e)=> {
    swipingCheck = true;
});
function wheelChacking(e) {
    if(swipingCheck) {
        if (e.deltaY < 0) {
            if(wheelCheckTop) {
                scrollingPage(true); //Scrolling up
                wheelCheckTop = false;
                setTimeout(()=> {
                    wheelCheckTop = true;
                    circle.style.transition = '0s';
                }, 500);
            }
        }
        if (e.deltaY > 0) {
            if(wheelCheckBot) {
                scrollingPage(); //Scrolling down
                wheelCheckBot = false;
                setTimeout(()=> {
                    circle.style.transition = '0s';
                    wheelCheckBot = true;
                }, 500);
            }
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
    circle.style.transition = '0s';
    if(e.target.classList.contains('element')) {
        circlePositionTop = e.target.getBoundingClientRect().top;
        circlePositionLeft = e.target.getBoundingClientRect().left;
        
        rotatePages(e);
        changePosition();
    }
    circle.style.transition = '0s';
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

function rotatePages(e) {
    let rotate = e.target.getAttribute('data-num');
    
    
    if(rotate == 0) {
        pages[0].style.transform = 'rotateX(0deg)';
        pages[1].style.transform = 'rotateY(180deg)';
        pages[2].style.transform = 'rotateX(-180deg)';
        pages[3].style.transform = 'rotateY(-180deg)';
    } else if(rotate == 1) {
        pages[0].style.transform = 'rotateX(-180deg)';
        pages[1].style.transform = 'rotateY(360deg)';
        pages[2].style.transform = 'rotateX(-180deg)';
        pages[3].style.transform = 'rotateY(-180deg)';

        
    } else if(rotate == 2) {
        pages[0].style.transform = 'rotateX(-180deg)';
        pages[1].style.transform = 'rotateY(520deg)';
        pages[2].style.transform = 'rotateX(-360deg)';
        pages[3].style.transform = 'rotateY(-180deg)';
    } else if(rotate == 3) {
        pages[0].style.transform = 'rotateX(-180deg)';
        pages[1].style.transform = 'rotateY(520deg)';
        pages[2].style.transform = 'rotateX(-520deg)';
        pages[3].style.transform = 'rotateY(-360deg)';
    }
    if(rotate == 1) {
        for(let x = 0; x < lines.length; x++) {
            lines[x].classList.remove('linePlus');
        }
    } else {
        for(let x = 0; x < lines.length; x++) {
            lines[x].classList.add('linePlus');
        }
    }

}

function changePosition() {
    if(page === 0) {
        circle.style.top = '50vh';
        circle.style.left = '50vw';
        
        setTimeout(()=> {
            circle.style.top = '50vh';
            circle.style.left = '50vw';
        },50);
    } else if(page === 1) {
        circle.style.top = circlePositionTop + 15 + 'px';
        circle.style.left = circlePositionLeft - 35 + 'px';
        setTimeout(()=> {
            circle.style.top = circlePositionTop + 15 + 'px';
            circle.style.left = circlePositionLeft - 35 + 'px';
        },50);
    } else if(page === 2) {
        circle.style.top = '10vh';
        circle.style.left = '90vw';
        footerHead.style.transform = 'translateX(0px)';
        setTimeout(()=> {
            circle.style.top = '10vh';
            circle.style.left = '90vw';
        },50);
    } else {
        footerHead.style.transform = 'translateX(100vw)';
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

