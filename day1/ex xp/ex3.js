const resolvedPromise = Promise.resolve(3);
resolvedPromise.then(value => console.log(value)); 

const rejectedPromise = Promise.reject("Bouh !");
rejectedPromise.catch(error => console.log(error)); 