
function shuffle(arr) {
  var i = arr.length, j, temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
}

var CARD_MAP, CARD_ARRAY;
function draw(N, justMajor, reversed) {
  let cards = [...CARD_ARRAY];
  if (justMajor) {
    cards = cards.filter(x => x.type == "MajorArcana");
  }
  shuffle(cards);
  cards = cards.slice(0, N || 3);
  cards.forEach(c => c.upright = !reversed || Math.random() > 0.5);
  return cards;
}


var CARDS;
fetch("./src/cards.json").then(x => x.json()).then(x => {
  CARD_MAP = x;
  CARD_ARRAY = Object.values(x);

  if (window.location.search) {
    if (window.location.search === "?sleek") {
      CARDS = draw(cardN(), false, true);
      console.log("sleek time");
      document.body.classList.add('sleek')
      refreshList(false, true);
      return;
    }


    CARDS = window.location.search.replace('?', '').split(',').map(code => {
      let reversed = code[code.length - 1] == "r";
      if (reversed) {
        code = code.slice(0, code.length - 1)
      }
      let card = CARD_MAP[code];
      card.upright = !reversed;
      return card
    })
  } else {
    CARDS = draw(cardN(), false, true);
  }


  refreshList(false, true);
});

function cardN() {
  switch (drawMode.value) {
    case "3": return 3;
  }
  return 3;
}

function refreshList() {
  cardList.innerHTML = CARDS.map((card, i) => {
    let align = card.upright ? "upright" : "reversed";
    return `
    <li>
      <select selected="${card.code}" onchange="changedCard(${i}, this)">
        ${CARD_ARRAY.map(c => `
          <option value=${c.code} ${c.code == card.code ? "selected" : ""}>${c.name}</option>
        `).concat("")}
      </select>
      <button type="button" onclick="flippedCard(${i}, this)" class="select-${align}">${align}</button>
    </li>`;
  }).join("");
  showCards();
  updateURL();
}

function showCards() {
  cardImages.innerHTML = CARDS.map((card, i) => {
    return `
      <div class="${card.upright ? "card" : "card reversed"}">
        <img src="cards/color/${card.png}">
      </div>
    `
  }).join("");
  writeInterpretations();
}

function cardCode(card) {
  if (typeof card === "string") {
    console.warn(card, 'already a code?')
    return card
  }
  if (typeof card !== "object") {
    console.warn(card, "not an object!")
  }
  return card.code + (card.upright ? "" : "r")
}

function cardsString() {
  return CARDS.map(cardCode).join(",")
}
function updateURL() {
  window.history.replaceState({}, '', `${window.location.pathname}?${cardsString()}`);
}

function drawRandom() {
  CARDS = draw(cardN(), justMajor.checked, reversedOk.checked)
  refreshList();
}

function changedCard(i, el) {
  let upright = CARDS[i].upright;
  CARDS[i] = CARD_MAP[el.value]
  CARDS[i].upright = upright;
  showCards();
  updateURL();
}

function classy(el, cls, pred) {
  pred ? el.classList.add(cls) : el.classList.remove(cls);
}

function flippedCard(i, el) {
  let upright = CARDS[i].upright = !CARDS[i].upright;
  classy(cardImages.children[i], "reversed", !upright);
  // showCards();
  el.classList = [upright ? "select-upright" : "select-reversed"];
  el.innerText = upright ? "upright" : "reversed";
  updateURL();
  writeInterpretations();
}

function alwaysReverse(el) {
  classy(cardImages, "alwaysReverse", el.checked);
}

function savePNG() {
  html2canvas(cardImages).then(canvas => {
    let img = canvas.toDataURL("image/png")
    let link = document.createElement("a");
    link.hidden = true;
    link.href = img;
    // todo: use url!
    link.download = `tarot ${cardsString()}.png`;
    link.click();
  });
}