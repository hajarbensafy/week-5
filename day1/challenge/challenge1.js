function makeAllCaps(words) {
    return new Promise((resolve, reject) => {
      if (words.every(word => typeof word === 'string')) {
        const uppercasedWords = words.map(word => word.toUpperCase());
        resolve(uppercasedWords);
      } else {
        reject("Le tableau contient des éléments non-chaînes !");
      }
    });
  }
  
  function sortWords(words) {
    return new Promise((resolve, reject) => {
      if (words.length > 4) {
        const sortedWords = [...words].sort();
        resolve(sortedWords);
      } else {
        reject("Le tableau doit contenir plus de 4 mots !");
      }
    });
  }
  
  makeAllCaps([1, "pear", "banana"])
    .then(sortWords)
    .then(console.log)
    .catch(console.error);
  
  makeAllCaps(["apple", "pear", "banana"])
    .then(sortWords)
    .then(console.log)
    .catch(console.error); 
  
  makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
    .then(sortWords)
    .then(console.log) 
    .catch(console.error);