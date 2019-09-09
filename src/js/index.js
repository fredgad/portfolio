import "./import/modules";

document.addEventListener('DOMContentLoaded', ()=> {


    setCookie('lang', 'ENG', {'max-age': 3600});
    nameAppearance(1);

    let  wrapper = document.getElementById('wrapper'),
    positions = ['0', '-100vw', '-100vw, -100vh', '-200vw, -100vh'],
    width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    page = 0,
    mouseCheck = false, //Mouse events trigger
    wheelCheckTop = true,
    wheelCheckBot = true,
    swipingCheck = true,
    navCheck = false,
    theName = document.querySelectorAll('#theName p'),
    theWorks = document.querySelectorAll('#works p'),
    pages = document.getElementById('pages').children,
    LElements = document.querySelectorAll('.L'),
    footerHead = document.querySelector('#works > h2'),
    comingSoon = document.querySelector("#comingSoon"),
    circle = document.querySelector('.field'),
    aboutMe = document.querySelector('.about__menu_about-me'),
    lines = document.querySelectorAll('.line'),
    page1A = document.querySelectorAll('.page1 a'),
    page2A = document.querySelectorAll('.page2 a'),
    aboutMeCont = document.querySelector('.about-me__cont'),
    skillsCont = document.querySelector('.skills__cont'),
    experienceCont = document.querySelector('.experience__cont'),
    skills = document.querySelector('.about__menu_skills'),
    experience = document.querySelector('.about__menu_experience'),
    contacts = document.querySelector('.about__menu_contacts'),
    aboutMenu = document.querySelector('.about__menu'), 
    nav = document.querySelector('#nav'),
    navbar = document.querySelector('.navbar'),
    navCircle = document.querySelector('.circle'),
    navbarLines = document.querySelectorAll('.navbar__line'),
    navButton = document.querySelector('#navButton'),
    navWall = document.getElementById('navWall'),
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
    if(navCheck) {
        buttonEvent(300);
    } 
    wheelChacking(e)
});
navButton.addEventListener('click', () => { buttonEvent(300) });
navButton.addEventListener('touchstart', () => { buttonEvent(300) });
navButton.addEventListener('touchend', (e) => { 
    if(e.preventDefault) {
        e.preventDefault()
    }
 });

(function antiWheel(...args) {
    args.map(elem => {
        elem.addEventListener('mouseover', ()=> swipingCheck = false)
        elem.addEventListener('mouseleave', ()=> swipingCheck = true)
        elem.addEventListener('mouseout', ()=> swipingCheck = true)
        elem.addEventListener('touchstart', ()=> swipingCheck = false)
        elem.addEventListener('touchend', ()=> {
            setTimeout(()=> {
                return swipingCheck = true
            }, 0)
        })
    })
})(aboutMeCont, skillsCont, experienceCont);

//Mouse slider
document.addEventListener('touchstart', (e)=> {
    let touchObj = e.changedTouches[0];
    startTime = new Date().getTime();
    swipeX = touchObj.pageX;
    swipeY = touchObj.pageY;
    swipeHeight = 0;
});
document.addEventListener('touchmove', (e)=> {
    if(navCheck) {
        buttonEvent(300);
    } 
});
document.addEventListener('touchend', (e)=> {
    if(swipingCheck) {
        swipeEnd(e)
    }
});

//Circle position event
aboutMenu.addEventListener('mouseover', (e)=> {
    circle.style.transition = '0s';
    if(e.target.classList.contains('element') && wheelCheckTop && wheelCheckBot) {
        circlePositionTop = e.target.getBoundingClientRect().top;
        circlePositionLeft = e.target.getBoundingClientRect().left;
        
        rotatePages(e);
        changePosition();
    }
    circle.style.transition = '0s';
});
aboutMenu.addEventListener('touchstart', (e)=> {
    circle.style.transition = '0s';
    if(e.target.classList.contains('element') && wheelCheckTop && wheelCheckBot) {
        circlePositionTop = e.target.getBoundingClientRect().top;
        circlePositionLeft = e.target.getBoundingClientRect().left;
        
        rotatePages(e);
        changePosition();
    }
    circle.style.transition = '0s';
});


//Functions 
function buttonEvent(speed) {
    navCheck = navCheck ? false : true;
    navCircle.classList.add('circleOut'); 
    document.querySelector('.hide__circle').classList.add('hideOut');
	if (navCheck) {
        navWall.classList.add('navWall');
        nav.classList.add('navOpen');
        nav.classList.add('navOpenWidth');
        
        new Promise((r)=> {
            setTimeout(()=> {
                if(navCheck) {
                    navbar.classList.add('navbarOpen');
                    r(1);
                }
            }, speed);
        }).then(()=> {
            for(let x = 0; x < navbarLines.length; x++) {
                setTimeout(()=> {
                    if(navCheck) {
                        navbarLines[x].classList.add('lineOut');
                    }
                }, x * 35);
            }
        })
	} else {
        navCircle.classList.remove('circleOut');
        navWall.classList.remove('navWall');
        for(let x = navbarLines.length-1; x > -1; x--) {
            if(!navCheck) {
                setTimeout(()=> {
                    nav.classList.remove('navOpen');
                    navbarLines[x].classList.remove('lineOut');
                    if(!navCheck) {
                        document.querySelector('.hide__circle').classList.remove('hideOut');
                    }
                }, (navbarLines.length - x) * 35);
            }
        }
        setTimeout(()=> {
            if(!navCheck) {
                nav.classList.remove('navOpenWidth');
                navbar.classList.remove('navbarOpen');
            }
        }, speed + 340);
	}
}

function wheelChacking(e) {
    if(swipingCheck) {
        if (e.deltaY < 0) {
            if(wheelCheckTop) {
                scrollingPage(true); //Scrolling up
                wheelCheckTop = false;
                setTimeout(()=> {
                    wheelCheckTop = true;
                    circle.style.transition = '0s';
                }, 350);
            }
        }
        if (e.deltaY > 0) {
            if(wheelCheckBot) {
                scrollingPage(); //Scrolling down
                wheelCheckBot = false;
                setTimeout(()=> {
                    circle.style.transition = '0s';
                    wheelCheckBot = true;
                }, 350);
            }
        }
    }
}

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
    if(page === 0) {
        nameAppearance(1);
    } else {
        nameAppearance(0);
    }

    if(page >= 2) {
        worksAppearance(1);
    } else {
        worksAppearance(0);
    }
    
    wrapper.style.transform = `translate(${positions[page]})`;
    circleChangeSize();
    changePosition();
};

function nameAppearance(bool) {
    if(bool) {
        setTimeout(()=> {
            Array.from(theName).map((el, i) => { 
                setTimeout(()=> {
                    el.classList.add('away')
                    el.classList.add('tran')
                }, i * 60)
            })
        }, 340);
    } else {
        Array.from(theName).map(el => el.classList.remove('away'))
    }
};

function worksAppearance(bool) {
    if(bool) {
        setTimeout(()=> {
            Array.from(theWorks).map((el, i) => { 
                setTimeout(()=> {
                        el.classList.add('trip')
                }, i * 100)
            })
        }, 340);
    } else {
        Array.from(theWorks).map(el => el.classList.remove('trip'))
        setTimeout(()=> {
            Array.from(theWorks).map((el, i) => {
                setTimeout(()=> {
                    el.classList.remove('trip')
                }, i * 100)
            })
        }, 340);
    }
};

function rotatePages(e) {
    let rotate = e.target.getAttribute('data-num');
    
    switch (rotate) {
    case '0':
        pages[0].style.transform = 'rotateX(0deg)';
        pages[1].style.transform = 'rotateY(180deg)';
        pages[2].style.transform = 'rotateX(-180deg)';
        pages[3].style.transform = 'rotateY(-180deg)';
        break;
    case '1': 
        pages[0].style.transform = 'rotateX(-180deg)';
        pages[1].style.transform = 'rotateY(360deg)';
        pages[2].style.transform = 'rotateX(-180deg)';
        pages[3].style.transform = 'rotateY(-180deg)';
        break;
    case '2': 
        pages[0].style.transform = 'rotateX(-180deg)';
        pages[1].style.transform = 'rotateY(520deg)';
        pages[2].style.transform = 'rotateX(-360deg)';
        pages[3].style.transform = 'rotateY(-180deg)';
        break;
    case '3': 
        pages[0].style.transform = 'rotateX(-180deg)';
        pages[1].style.transform = 'rotateY(520deg)';
        pages[2].style.transform = 'rotateX(-520deg)';
        pages[3].style.transform = 'rotateY(-360deg)';
        break;
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
};

function changePosition() {
    if(page === 0) {
        circle.style.top = 'calc(50vh - 30px)';
        circle.style.left = 'calc(50vw - 30px)';
        
        setTimeout(()=> {
            circle.style.top = 'calc(50vh - 30px)';
            circle.style.left = 'calc(50vw - 30px)';
        },50);
    } else if(page === 1) {
        circle.style.top = circlePositionTop  + aboutMe.offsetHeight/2 - 7 + 'px';
        circle.style.left = circlePositionLeft - 35 + 'px';
        setTimeout(()=> {
            circle.style.top = circlePositionTop + aboutMe.offsetHeight/2 - 7 + 'px';
            circle.style.left = circlePositionLeft - 35 + 'px';
        },50);

        for(let x = 0; x < page1A.length; x++) {
            page1A[x].classList.add('page1__flyTop');
        }
    } else if(page === 2) {
        for(let x = 0; x < page1A.length; x++) {
            page1A[x].classList.remove('page1__flyLeft');
            page1A[x].classList.remove('page1__flyTop');
        }
        for(let x = 0; x < page2A.length; x++) {
            page2A[x].classList.add('page2__fly');
        }

        circle.style.top = '10vh';
        circle.style.left = '90vw';
        footerHead.style.transform = 'translateX(0px)';
        setTimeout(()=> {
            circle.style.top = '10vh';
            circle.style.left = '90vw';
        },50);
    } else {
        footerHead.style.transform = 'translateX(100vw)';

        for(let x = 0; x < page1A.length; x++) {
            page1A[x].classList.add('page1__flyLeft');
        }
        for(let x = 0; x < page2A.length; x++) {
            page2A[x].classList.remove('page2__fly');
        }
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

//Coming soon
for(let x = 0; x < 35; x++) {
  comingSoon.innerHTML += '<div class="box"></div>';
} 
let box = document.querySelectorAll(".box");
for(let y = 0; y < box.length; y++) {
  box[y].style.animation = `forBox 5s cubic-bezier(.36,0,.64,.99)  ${y / 100}s infinite alternate`;
}








//Cookie 
function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    ...options
  };
  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  document.cookie = updatedCookie;
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
  
document.getElementById('swap').addEventListener('click', () => {
    if(getCookie('lang') === 'ENG') {
        setCookie('lang', 'РУС', {'max-age': 3600})
        changeLanguage(1)
    }else {
        setCookie('lang', 'ENG', {'max-age': 3600})
        changeLanguage(0)
    }
});

function changeLanguage(bool) {
    Array.from(LElements).map(el => {
        if(bool) {
            el.innerText =  el.getAttribute('data-r')
        } else {
            el.innerText =  el.getAttribute('data-e')
        }
    })
}
  


});

