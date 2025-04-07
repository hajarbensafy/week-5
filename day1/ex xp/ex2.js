const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("succès");
    }, 4000);
  });
  
  promise.then(result => console.log(result)); 