let cards = [];
let toCheck = [];
let tries = 0;
let finished = false;

function createDeck(nPairs) {
    let deck = [];
    for (let i = 0; i < nPairs; i++) {
        let cardId = Math.floor(Math.random()*200);
        deck.push(cardId);
        deck.push(cardId);
    }
    return deck;
}

function shuffleCards(deck) {
    let shuffled = []
    while (deck.length) {
        let randomIndex = Math.floor(Math.random()*deck.length);
        let randomCard = deck.splice(randomIndex,1)[0];
        shuffled.push(randomCard)
    }
    return shuffled;
}

function isPair(cards) {
    return cards[0].attributes.card.value === cards[1].attributes.card.value;
}

function checkCards(flippedCards) {
    if (!isPair(flippedCards)) {
        flippedCards.forEach(card => {
            card.classList.remove('show');
        });
    }
}

function flipCard(event) {
    tries += 0.5;
    event.target.classList.add('show');
    toCheck.push(event.target);
    if (tries%1 == 0 && !finished) {
        setTimeout(checkCards, 1000, toCheck);
        toCheck = [];
        document.getElementById('tries').innerText = tries;
        //End game?: Contar si todas las cartas estan "show" y mostrar mensaje final.
        let cardsCompleted = document.getElementsByClassName('show');
        finished = (cardsCompleted.length === cards.length);
        if (finished) {
            document.getElementById('tries').innerText = tries + '🎉';
        }
    }
}

function setTable() {
    document.getElementById('tries').innerText = 0;
    let table = document.getElementById('table');
    table.innerHTML = '';
    cards.forEach(card => {
        let item = document.createElement('div');
        item.className = 'card';
        item.setAttribute('card', card);
        item.addEventListener('click', flipCard)
        /*En vez de mostrar el número, cambiamos el estilo de la tarjeta para mostrar una imagen*/
        //item.innerText = card;
        item.style.backgroundImage="url('https://picsum.photos/seed/"+card+"/200/300')";
        table.appendChild(item);
    })
}

function startGame() {
    let nPairs = parseInt(document.getElementById('nPairs').value);
    tries = 0;
    finished = false;
    cards = createDeck(nPairs);
    cards = shuffleCards(cards);
    console.log(cards);
    setTable();
}