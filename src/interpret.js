let INTERP_KIND;
let INTERPRETATIONS;

fetch("./src/interpretations.json").then(x => x.json()).then(x => {
    INTERPRETATIONS = x;

    INTERP_KIND = localStorage['interp'] ?? 'rider-waite';
    document.getElementById('interpSelect').value = INTERP_KIND;

})

function writeInterpretations() {
    INTERP_KIND = document.getElementById('interpSelect').value;
    localStorage['interp'] = INTERP_KIND

    let interp = INTERPRETATIONS[INTERP_KIND];

    document.getElementById('interpDesc').innerHTML = `
        <b><a href="${interp.url}">${interp.name}</a> by ${interp.author}</b>: ${interp.description}
    `;

    document.getElementById('interpretations').innerHTML = CARDS.map((card, i) => {
        const R = ", reversed"
        let cardName = card.name;
        if (!card.upright && !cardName.endsWith(R)) {
            cardName += R;
        }
        if (card.upright && cardName.endsWith(R)) {
            cardName = cardName.replace(R, "");
        }
        return `<li>
            <span class='interpCard'><b>${cardName}</b>: ${interp[cardCode(card)]}</span>
        </li>`
    }).join("\n");
}