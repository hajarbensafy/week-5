const morse = `{ ... }`; 

function toJs() {
  return new Promise((resolve, reject) => {
    try {
      const morseObj = JSON.parse(morse);
      if (Object.keys(morseObj).length === 0) {
        reject("L'objet Morse est vide !");
      } else {
        resolve(morseObj);
      }
    } catch (error) {
      reject("Erreur de parsing JSON !");
    }
  });
}

function toMorse(morseJS) {
  return new Promise((resolve, reject) => {
    const userInput = prompt("Entrez un mot ou une phrase :").toLowerCase();
    const invalidChars = [...userInput].filter(char => !morseJS[char]);

    if (invalidChars.length > 0) {
      reject(`Caractère(s) invalide(s) : ${invalidChars.join(", ")}`);
    } else {
      const morseTranslation = [...userInput].map(char => morseJS[char]);
      resolve(morseTranslation);
    }
  });
}

function joinWords(morseTranslation) {
  const translationStr = morseTranslation.join("\n");
  document.body.innerHTML = `<pre>${translationStr}</pre>`;
}

toJs()
  .then(toMorse)
  .then(joinWords)
  .catch(console.error);