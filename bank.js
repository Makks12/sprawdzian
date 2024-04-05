import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: blue;
  color: white;
  border:1px solid blue;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
`;

const BankAccount = () => {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [accountBalance, setAccountBalance] = useState(2000);
  const [availableCredit, setAvailableCredit] = useState(0);
  const [historieTransakcji, ustawHistorieTransakcji] = useState([]);

  const handleOperation = () => {
    const operationType = document.querySelector('input[name="operation"]:checked').value;
    return operationType;
  };

  const handleTransaction = () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const operation = handleOperation();

    setCurrentAmount(amount);
    if (operation === 'depozyt') {
      setAccountBalance(poprzedniBalans => poprzedniBalans + amount);
      ustawHistorieTransakcji(prevHistory => [...prevHistory, { type: 'depozyt', amount, date: new Date().toLocaleString()}]);
    } else if (operation === 'wyplata') {
      if (accountBalance - amount >= -availableCredit) {
        setAccountBalance(poprzedniBalans => poprzedniBalans - amount);
        ustawHistorieTransakcji(prevHistory => [...prevHistory, { type: 'wyplata', amount, date: new Date().toLocaleString()}]);
      } else if(accountBalance === 0){
        return alert("Nie masz wystaraczajaco money");
      }
    }
  };

  const zmienDebet = () => {
    const creditLimit = parseFloat(document.getElementById('limitKasy').value);
    setAvailableCredit(creditLimit);
  };

  const sprawdzHistorie = () => {
    console.log(historieTransakcji);
  };

  return (
    <div className="wyglad">
      <h1>Stan Konta: {accountBalance} zł</h1>
      <h3>Operacja:</h3>
      <input type="radio" name="operation" value="depozyt" defaultChecked></input>
      Wpłata
      <input type="radio" name="operation" value="wyplata"></input>
      Wypłata
      <h2>Kwota</h2>
      <input type="number" id="amount" placeholder="Wprowadź kwotę"></input><br/><br/>
      <Button type="button" value="Potwierdź" onClick={handleTransaction}>Potwierdź</Button>
      <h2>Nowy limit kredytowy (debet)</h2>
      <input type="number" id="limitKasy" placeholder="Wprowadź kwotę"></input><br/><br/>
      <Button value="Potwierdź" onClick={zmienDebet}>Potwierdź</Button>
      <h1>Historia operacji</h1>
      <Button value="Historia" onClick={sprawdzHistorie}>Historia</Button>
    </div>
  );
};

export default BankAccount;
