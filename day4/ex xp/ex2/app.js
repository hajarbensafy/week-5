import people from './data.js';

function calculateAverageAge(persons) {
    const totalAge = persons.reduce((sum, person) => sum + person.age, 0);
    const averageAge = totalAge / persons.length;
    console.log(`The average age is: ${averageAge.toFixed(1)}`);
    return averageAge;
}

calculateAverageAge(people);