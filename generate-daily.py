import json
from datetime import date
from pathlib import Path
from random import shuffle, random


INTERPRETATIONS = json.loads(Path('src/interpretations.json').read_text())
CARDS = list(json.loads(Path('src/cards.json').read_text()).values())

shuffle(CARDS)
cards = CARDS[:3]
for c in cards:
    c['upright'] = random() > 0.5
    code = c['code']
    if not c['upright']:
        code += 'r'
        c['name'] += ', reversed'
    
    c.pop('type')

    interp = INTERPRETATIONS['labyrinthos'][code]
    c['interpretation'] = interp.removesuffix('</a>').split('>')[-1]

data = {
    'date': str(date.today()),
    'cards': cards,
}

print(json.dumps(data, indent=2))