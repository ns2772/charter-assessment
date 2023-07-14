import React, { useEffect, useState } from 'react';

const fetchData = () => {
  // Simulating an asynchronous API call to fetch data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Make up a data set to demonstrate the solution
      const transactions = [
        { customer: 'John', month: 'January', amount: 120 },
        { customer: 'John', month: 'February', amount: 80 },
        { customer: 'John', month: 'March', amount: 150 },
        { customer: 'Sarah', month: 'January', amount: 60 },
        { customer: 'Sarah', month: 'February', amount: 110 },
        { customer: 'Sarah', month: 'March', amount: 90 },
      ];
      resolve(transactions);
    }, 1000);
  });
};

const RewardPointsCalculator = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData().then((data) => {
      setTransactions(data);
    });
  }, []);

  const calculateRewardPoints = (amount) => {
    let rewardPoints = 0;

    if (amount > 100) {
      rewardPoints += (amount - 100) * 2;
    }

    if (amount > 50 && amount <= 100) {
      rewardPoints += amount - 50;
    }

    return rewardPoints;
  };

  const calculateTotalRewardPoints = (customer) => {
    const customerTransactions = transactions.filter(
      (transaction) => transaction.customer === customer
    );
    const totalRewardPoints = customerTransactions.reduce(
      (total, transaction) => total + calculateRewardPoints(transaction.amount),
      0
    );
    return totalRewardPoints;
  };

  return (
    <div>
      <h2>Reward Points Calculator</h2>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Month</th>
            <th>Transaction Amount</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.customer}</td>
              <td>{transaction.month}</td>
              <td>${transaction.amount}</td>
              <td>{calculateRewardPoints(transaction.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Reward Points</h3>
      {Array.from(new Set(transactions.map((transaction) => transaction.customer))).map(
        (customer) => (
          <p key={customer}>
            {customer}: {calculateTotalRewardPoints(customer)}
          </p>
        )
      )}
    </div>
  );
};

export default RewardPointsCalculator;
