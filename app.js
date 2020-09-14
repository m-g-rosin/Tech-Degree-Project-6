const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const myButton = document.querySelector(".btn__reset")
const letter = document.getElementsByClassName("letter");
const buttons = document.getElementsByTagName("button");
const heart = document.querySelectorAll('.tries img');
let missed = 0;

const phrases = ["strength in adversity is a form of greatness", 
"go bravely where you have never gone before", 
"travel is the best and fastest way to learn more about yourself",
"love radically",
"all the best"];

myButton.addEventListener("click", function() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("overlay").classList.remove("win", "lose");
    missed = 0;
    for(let i = 0; i < 5; i++) {
        heart[i].src ='images/liveHeart.png';
    }
    while(phrase.firstChild) {
        phrase.removeChild(phrase.lastChild);
   }
    for(let i = 0; i < buttons.length; i++){
        buttons[i].classList.remove('chosen'); 
        buttons[i].disabled  = false;  
    } 
    for(let i = 0; i < letter.length; i++) {
            letter[i].classList.remove('show');     
        }  
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhrasetoDisplay(phraseArray); 
});

function getRandomPhraseAsArray(arr){
    let randNum = Math.floor(Math.random() * arr.length)
    let randPhrase = arr[randNum];
    let newPhrase = randPhrase.split("");
    return newPhrase;
} 

function addPhrasetoDisplay(arr){
    for(let ele of arr) {
        const newLi = document.createElement("li");
        const newContent = document.createTextNode(ele)
        newLi.appendChild(newContent);
        phrase.appendChild(newLi);
        if(ele !== " ") {   
            newLi.classList.add('letter');
        } else {
            newLi.classList.add('space');
        }
    } return phrase; 
}


function checkLetter (a){
    let match = null;
    for(let i = 0; i < letter.length; i++) {
        if(a === letter[i].innerText) {
            letter[i].classList.add('show'); 
            match =  letter[i];
        }  else if(a.length > 1) {
            match = 'something';
        }
    }   return match;
}

qwerty.addEventListener("click",  event => {
    for(let i = 0; i < buttons.length; i++) {
        if(event.target.innerText === buttons[i].innerText) {
            buttons[i].classList.add('chosen'); 
            buttons[i].disabled = true;  
        }
    }
        const letterFound = checkLetter(event.target.innerText);
        if(letterFound == null ) {
            missed += 1;
            heart[missed-1].src ='images/lostHeart.png';  
    }
         checkWin(missed);
});

function checkWin (missed) {
    let show = document.getElementsByClassName("show");
    let letters = document.getElementsByClassName("letter")
    if(show.length == letters.length) {
        document.getElementById("overlay").classList.add("win");
        document.querySelector(".win").style.display = "flex";
        document.querySelector(".title").innerHTML = "You Win"       
    } else if(missed > 4) {
        document.getElementById("overlay").classList.add("lose");
        document.querySelector(".lose").style.display = "flex";
        document.querySelector(".title").innerHTML = "You Lose"      
    }     
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhrasetoDisplay(phraseArray);




