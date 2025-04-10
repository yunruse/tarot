import json
from pathlib import Path

from random import shuffle, random

INTERPRETATIONS = json.loads(Path('src/interpretations.json').read_text())
CARDS = list(json.loads(Path('src/cards.json').read_text()).values())

shuffle(CARDS)
cards = CARDS[:3]
for c in cards:
    c['upright'] = random() > 0.5
    if not c['upright']:
        c['code'] += 'r'
        c['name'] += ', reversed'

    interp = INTERPRETATIONS['labyrinthos'][c['code']]
    c['interpretation'] = interp.removesuffix('</a>').split('>')[-1]

print(json.dumps(cards, indent=2))