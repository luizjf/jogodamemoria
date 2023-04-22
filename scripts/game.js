
let game = {

  lockMode: false,
  firstCard: null,
  secondCard: null,
  
  setCard: function(id){

    let card = this.cards.filter(card => card.id === id)[0];

    if(card.flipped || this.lockMode){
      return false;
    }

    if(!this.firstCard){
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  checkMatch: function(){
    if(!this.firstCard || !this.secondCard){
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },

  clearCard: function(){
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  unflipCards(){
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCard();
  },

  checkGameOver(){

    return this.cards.filter(card => !card.flipped).length == 0;
  },

  naruto: ['jirayavspain',
    'itachivssasuke',
    'kakashivsobito',
    'killebevssasuke',
    'madaravsgaisensei',
    'madaravsnarutoesasuke',
    'minato vs obito',
    'narutovssasuke',
    'rock leevsgaara',
  ],

  cards: null,

  createCardsFromNaruto: function (){

    this.cards = [];

    this.naruto.forEach((narutos) => {
      this.cards.push(this.createPairFromNaruto(narutos))
    })

    this.cards = this.cards.flatMap(pair => pair);
    this.shuffleCards();
    return this.cards;
  },

  createPairFromNaruto: function (narutos){
      return[{
          id: this.createIdWithNaruto(narutos),
          icon: narutos,
          flipped: false,
      }, {
          id: this.createIdWithNaruto(narutos),
          icon: narutos,
          flipped: false,
      }]
  },

  createIdWithNaruto: function (narutos){
      return narutos +parseInt(Math.random() * 1000);
  },

  shuffleCards: function (cards){
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while(currentIndex !==0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
    }
}

}
