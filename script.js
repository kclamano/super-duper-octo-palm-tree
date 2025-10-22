// 1. DEFINE YOUR MESSAGE AND KEY
const SECRET_KEY = 23;
const ENCRYPTED_MESSAGE = `EXIILLR JV ILSBB, Exmmv pbzlka jlkqepxov !
Illhfkd yxzh, F afak'q obxiiv bumbzq qexq xcqbo qexq jfprkabnpqxkafkd tb tlria pqfii cfka lro txv yxzh ql bxze lqebo. Fq'p klq qexq fq txp cxpq clo jb ql jlsb lk colj, yrq fq'p grpq qexq xq qexq qfjb F hkbt qll tbii qexq vlr afak'q abpbosb ql cbfi qexq xka abpbosba pljblkb ybqqbo. F jxv klq pxv fq xii qeb qfjb ybzxrpb F zxk'q cfka qeb ofdeq tloap ql pxv elt doxqbcri F xj ql exsb vlr fk jv ifcb klt xka elbcriiv clobsbo, clo dfsfkd jb x zexkzb, clo ilsfkd jb, clo zxofkd clo jb, xka clo xitxvp jxhfkd jb cbbi qexq F xj bklrde. Vlr'sb yolrdeq pl jrze ifdeq xka mbxzb fkql jv ifcb, bsbk fk qeb pjxiibpq txvp. F'j pl molra lc rp, lc elt cxo tb'sb zljb, xka F'j illhfkd clotxoa ql qeb jbjlofbp tb'ii pqfii jxhb qldbqebo. Fq jxv klq xitxvp yb exmmfkbpp xka ptbbqkbpp. Qebob tfii yb qfjbp tebk tb jfdeq klq criiv rkabopqxka bxze lqebo, xka tebk qexq qfjb zljbp, F elmb qexq xq qeb bka lc qeb axv tb'ii pqfii cfka lro txv yxzh ql lkb xklqebo, grpq ifhb tb xitxvp exsb. F ilsb vlr 3000, jv ilsb, xka fq'p vlr qexq F'ii xitxvp zellpb fk bsbov ifcbqfjb.`;

// 2. HINT CONFIGURATION
const HINTS = [
    "Hint 1: It's a two-digit number.",
    "Hint 2: sikrit sikrit",
    "Hint 3: gew baby ko"
];

// Wrap all DOM interactions in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    let hintCount = 0;

    // Get DOM elements
    const encryptedTextElement = document.getElementById('encryptedText');
    const decryptedTextElement = document.getElementById('decryptedText');
    const decryptedHeader = document.getElementById('decryptedHeader');
    const keyInput = document.getElementById('cipherKey');
    const hintButton = document.getElementById('hintButton');
    const hintTextElement = document.getElementById('hintText');
    const decoderContainer = document.getElementById('decoder-container');
    const finalDisplay = document.getElementById('final-message-display');

    // Load the encrypted message
    encryptedTextElement.textContent = ENCRYPTED_MESSAGE;

    function hideDecoderBox() {
        decoderContainer.classList.add('hidden'); // Use the CSS class instead
    }

    // Remove the inner decryptCaesar function and use the one defined outside

    // 5. HINT BUTTON LOGIC
    hintButton.addEventListener('click', () => {
        if (hintCount < HINTS.length) {
            hintTextElement.textContent = HINTS[hintCount];
            hintTextElement.classList.add('hint-animation');
            setTimeout(() => {
                hintTextElement.classList.remove('hint-animation');
            }, 500);
            hintCount++;
        } else {
            hintTextElement.textContent = "ubos na hints blehhh :p";
        }
    });

    // 6. DECRYPTION EVENT LISTENER
    keyInput.addEventListener('input', () => {
        const enteredKey = keyInput.value;
        const isCorrect = parseInt(enteredKey) === SECRET_KEY;

        if (enteredKey === "") {
            decryptedTextElement.textContent = "Awaiting Key...";
            return;
        }

        const currentDecryptedText = decryptCaesar(ENCRYPTED_MESSAGE, enteredKey);
        
        if (isCorrect) {
            // Hide decoder box first
            hideDecoderBox();
            
            // Set up final display
            const finalH1 = document.getElementById('final-message-h1');
            const finalP = document.getElementById('final-message-p');
            
            finalH1.textContent = "Happy Monthsary, My Love!💙";
            finalP.textContent = currentDecryptedText;

            // Show final display
            finalDisplay.classList.add('visible');

            // Lock UI
            keyInput.disabled = true;
            hintButton.disabled = true;
        }
    });

    // Initialize
    keyInput.value = "";
});

// Keep single decryptCaesar function outside
function decryptCaesar(ciphertext, key) {
    let plaintext = "";
    key = parseInt(key) || 0;
    // Calculation to shift the characters back
    const decryptionShift = 26 - (key % 26);

    for (let i = 0; i < ciphertext.length; i++) {
        let char = ciphertext[i];
        if (/[a-zA-Z]/.test(char)) {
            const isUpperCase = char === char.toUpperCase();
            const baseCharCode = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            let charIndex = char.charCodeAt(0) - baseCharCode;
            let decryptedIndex = (charIndex + decryptionShift) % 26;
            char = String.fromCharCode(decryptedIndex + baseCharCode);
        }
        plaintext += char;
    }
    return plaintext;
}