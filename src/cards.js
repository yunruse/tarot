
function shuffle(arr) {
  var i = arr.length, j, temp;
  while(--i > 0){
    j = Math.floor(Math.random()*(i+1));
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

  CARDS = draw(cardN(), false, true);

  refreshList(false, true);
});

function cardN() {
  switch (drawAmount.value) {
    case "3": return 3;
  }
  return 3;
}

function refreshList(){
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
}

function showCards() {
  cardImages.innerHTML = CARDS.map((card, i) => {
    return `
      <div class="${card.upright ? "card" : "card reversed"}">
        <img src="cards/${card.png}">
      </div>
    `
  }).join("");
}

function drawRandom(){
  CARDS = draw(cardN(), justMajor.checked, reversedOk.checked)
  console.log(justMajor.checked, reversedOk.checked);
  refreshList();
}

function changedCard(i, el){
  let upright = CARDS[i].upright;
  CARDS[i] = CARD_MAP[el.value]
  CARDS[i].upright = upright;
  showCards();
}

function classy(el, cls, pred) {
  pred ? el.classList.add(cls) : el.classList.remove(cls);
}

function flippedCard(i, el){
  let upright = CARDS[i].upright = !CARDS[i].upright;
  classy(cardImages.children[i], "reversed", !upright);
  // showCards();
  el.classList = [upright ? "select-upright" : "select-reversed"];
  el.innerText = upright ? "upright": "reversed";
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
    link.download = "screenshot.png";
    link.click();
  });
}