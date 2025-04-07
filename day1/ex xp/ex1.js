function compareToTen(num) {
    return new Promise((resolve, reject) => {
      if (num <= 10) {
        resolve(`${num} est inférieur ou égal à 10`);
      } else {
        reject(`${num} est supérieur à 10`);
      }
    });
  }
  
  // Test
  compareToTen(15)
    .then(result => console.log(result))
    .catch(error => console.log(error)); 
  
  compareToTen(8)
    .then(result => console.log(result))
    .catch(error => console.log(error)); 