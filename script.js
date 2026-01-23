// all the text that shows up
const definitions = [
    "your sonic archive grows with you",
    "we design for linking of sounds",
    "tending to make space for more connections and listening",
    "gardening is not about nostalgia, it is an act of exercising user power and agency",
    "the visuals follow the listening",
    "we do not collapse everything into one format",
    "not sealed vaults, but places with built-in architecture for revisiting, re-hearing and re-contextualizing of personal knowledge (idk about this one)",
    "chronological order can be useful but shouldn't be constraining",
    "it is important to distinguish between 'my' and 'me'",
    "context and metadata matter; where was the sound captured, how was it heard, what tools were used, anything else that matters for your personal associations",
    "annotations are essential",
    "making and unmaking is a design principle",
    "require and facilitate re-listening",
    "help us design for slowness",
    "mixed media is expected and designed for", 
    "is for you to define for yourself"
];

// shuffle so they appear in random order
definitions.sort(() => Math.random() - 0.5);

let clickCount = 0;
const container = document.getElementById('definitionsContainer');
const titleLink = document.getElementById('titleLink');
const hint = document.getElementById('hint');
const usedPositions = []; // track where stuff already is

// check if new position overlaps with existing ones
function positionOverlaps(top, left) {
    for (let pos of usedPositions) {
        // check if too close (within 15% in any direction)
        if (Math.abs(pos.top - top) < 15 && Math.abs(pos.left - left) < 20) {
            return true;
        }
    }
    return false;
}

// find a spot that doesn't overlap
function findGoodPosition() {
    let attempts = 0;
    let top, left;
    
    // try to find a non-overlapping spot, give up after 50 tries
    do {
        top = Math.random() * 70; // 0-70% from top
        left = Math.random() * 50; // 0-50% from left
        attempts++;
    } while (positionOverlaps(top, left) && attempts < 50);
    
    return { top, left };
}

// when you click the title
titleLink.addEventListener('click', function(e) {
    e.preventDefault();
    
    // only add more if there's still definitions left
    if (clickCount < definitions.length) {
        const defDiv = document.createElement('div');
        defDiv.className = 'definition';
        defDiv.innerHTML = '<p>' + definitions[clickCount] + '</p>';
        
        // get a position that doesn't overlap
        const position = findGoodPosition();
        defDiv.style.position = 'absolute';
        defDiv.style.top = position.top + '%';
        defDiv.style.left = position.left + '%';
        
        // remember this position
        usedPositions.push(position);
        
        container.appendChild(defDiv);
        clickCount++;
        
        // just hide the hint when done, no end message
        if (clickCount === definitions.length) {
            hint.style.display = 'none';
        }
    }
});
