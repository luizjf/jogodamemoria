const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon"


startGame();

function startGame(){
    initializeCards(game.createCardsFromNaruto());
}

function initializeCards(cards){
    let gameBoard = document.getElementById("gameBoard");

    gameBoard.innerHTML = '';
    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);

        gameBoard.appendChild(cardElement);
    });
}


function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, cardElement){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if(face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./img/" + card.icon + ".jpg"
        cardElementFace.appendChild(iconElement);
    } else {
        let iconElement = document.createElement('img');
        iconElement.src = "./img/naruto logo.png";
        cardElementFace.appendChild(iconElement);
    }
    cardElement.appendChild(cardElementFace);
}

function flipCard(){

    if(game.setCard(this.id)){

        this.classList.add("flip")
        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCard();
                if(game.checkGameOver()){

                    setTimeout(() => {
                        let gameOverLayer = document.getElementById("gameOver");
                        gameOverLayer.style.display = 'flex';
                    }, 300);
                }
            } else {
    
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
        
                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip')
                    game.unflipCards();
                }, 900)
            };
        }
    }
}

function restart(){
    game.clearCard();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
}

