class Financer {
  constructor(financerName, loanHistory) {
    this.financerName = financerName;
    this.loanHistory = loanHistory;
  }
}

class Customer {
  constructor(customerName, cibilScore) {
    this.customerName = customerName;
    this.cibilScore = cibilScore;
  }
}

function averageOfFinancierCibilScore(data) {
  return data
    .map((element) => {
      const sum = element.loanHistory.reduce((sum, tup) => sum + tup[1], 0);
      const amount = element.loanHistory.reduce((sum, tup) => sum + tup[0], 0);
      return {
        name: element.financerName,
        average: Math.round(sum / element.loanHistory.length),
        amount: amount,
      };
    })
    .sort((a, b) => {
      if (a.average !== b.average) {
        return b.average - a.average;
      }
      return b.amount - a.amount;
    })
    .slice(0, 3);
}

function compareVlauesOfCibilScore(finData, customer) {
  let avgOfFinancier = averageOfFinancierCibilScore(finData);
  const bestMatches = [];
  customer.forEach((element) => {
    for (let i = 0; i < avgOfFinancier.length; i++) {
      if (element.cibilScore === avgOfFinancier[i].average) {
        bestMatches.push({
          fName: avgOfFinancier[i].name,
          cName: element.customerName,
        });
        break;
      }
    }
  });

  return bestMatches;
}

let finData = [
  new Financer("Abhijeet", [
    [100, 700],
    [75, 650],
    [50, 600],
  ]),

  new Financer("Lokesh", [
    [100, 750],
    [55, 700],
    [50, 650],
  ]),

  new Financer("Atul", [
    [100, 800],
    [95, 750],
    [50, 700],
  ]),
];

let customers = [
  new Customer("Customer 1", 750),
  new Customer("Customer 2", 700),
  new Customer("Customer 3", 650),
];

let bestMatches = compareVlauesOfCibilScore(finData, customers);
console.log(bestMatches);
