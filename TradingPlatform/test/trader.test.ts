import { expect } from "chai";
import { Fund } from "../src/models/fund";
import { DayTrader, Investor, StockTrader, Trader } from "../src/models/trader";
import { Transaction } from "../src/models/transaction";


// Start Day Trader tests

const daytrader = () => {
const daytraderFund = new Fund();
const daytraderInstance = new DayTrader(daytraderFund);
daytraderInstance.setTraderId(1);
return daytraderInstance;
}

const investor = () => {
const investorFund = new Fund();
const investorInstance = new Investor(investorFund);
investorInstance.setTraderId(2);
return investorInstance;
}

const stocktrader = () => {
const stocktraderFund = new Fund();
const stocktraderInstance = new StockTrader(stocktraderFund);
stocktraderInstance.setTraderId(3);
return stocktraderInstance;
}

const overLimit = (IDnumber: number) => {
      const expected = new Transaction();
      expected.traderId = IDnumber;
      return expected;
}

describe('Daytrader edge case testing', () => {
            it('(regular input storting) should return a balance of 3000', () => {
                  const expected = 3000;
                  const actual = daytrader().transaction(3000);
                  expect(actual.newBalance).to.deep.equal(expected);
      });      
            it('(Outer limit storting) should return a balance of 2000' , () => {
                  const expected = 2000;
                  const actual = daytrader().transaction(2000);
                  expect(actual.newBalance).to.deep.equal(expected); 
      });
            it('(Outer limit storting) should return a balance of 200000' , () => {
                  const expected = 200000;
                  const actual = daytrader().transaction(200000);
                  expect(actual.newBalance).to.deep.equal(expected);      
      });
            it('(Over limit storting) should return: Transaction { _traderId: 1 }' , () => {
                  const expected = overLimit(1);
                  const actual = daytrader().transaction(1999);
                  expect(actual).to.deep.equal(expected);      
      });
            it('(Over limit storting) should return: Transaction { _traderId: 1 }' , () => {
                  const expected = overLimit(1);
                  const actual = daytrader().transaction(200001);
                  expect(actual).to.deep.equal(expected);      
      });
            it('(regular input transactie) should return a balance of -1800' , () => {
                  const expected = -1800;
                  const actual = daytrader().transaction(-1800);
                  expect(actual.newBalance).to.deep.equal(expected);
      });
            it('(Outer limit transactie) should return a balance of -1000' , () => {
                  const expected = -1000;
                  const actual = daytrader().transaction(-1000);
                  expect(actual.newBalance).to.deep.equal(expected);
      });
            it('(Outer limit transactie) should return a balance of -2000' , () => {
                  const expected = -2000;
                  const actual = daytrader().transaction(-2000);
                  expect(actual.newBalance).to.deep.equal(expected);
      });
            it('(Over limit transactie) should return: Transaction { _traderId: 1 }' , () => {
                  const expected = overLimit(1);
                  const actual = daytrader().transaction(-999);
                  expect(actual).to.deep.equal(expected);
      });
            it('(Over limit transactie) should return: Transaction { _traderId: 1 }' , () => {
                  const expected = overLimit(1);
                  const actual = daytrader().transaction(-2001);
                  expect(actual).to.deep.equal(expected);
      });
});

describe('Investor edge case testing', () => {
            it('(regular input balance) should return a balance of 0' , () => {
                  const expected = 0;
                  const actual = investor().getBalance();
                  expect(actual).to.deep.equal(expected);
      });
            it('(Over limit balance) should return: Transaction { _traderId: 2 }' , () => {
                  const expected = overLimit(2);
                  const actual = investor().transaction(-1);
                  expect(actual).to.deep.equal(expected);
      });
            it('(regular input storting) should return a balance of 60000' , () => {
                  const expected = 60000;
                  const actual = investor().transaction(60000);
                  expect(actual.newBalance).to.deep.equal(expected);
      });
            it('(Over limit storting) should return: Transaction { _traderId: 2 }' , () => {
                  const expected = overLimit(2);
                  const actual = investor().transaction(49999);
                  expect(actual).to.deep.equal(expected);
      });
            it('(regular input transactie) should return a balance of 90000' , () => {
                  const investorFund = new Fund();
                  const investorInstance = new Investor(investorFund);
                  investorInstance.setTraderId(2);
                  const expected = 90000;
                  investorInstance.transaction(100000);
                  const actual = investorInstance.transaction(-10000);
                  expect(actual.newBalance).to.deep.equal(expected); 
      });        
            it('(Outer limit transactie) should return a balance of 50001' , () => {
                  const investorFund = new Fund();
                  const investorInstance = new Investor(investorFund);
                  investorInstance.setTraderId(2);
                  const expected = 50001;
                  investorInstance.transaction(100000);
                  const actual = investorInstance.transaction(-49999);
                  expect(actual.newBalance).to.deep.equal(expected);
      });
            it('(Over limit transactie) should return: Transaction { _traderId: 2 }' , () => {
                  const investorFund = new Fund();
                  const investorInstance = new Investor(investorFund);
                  investorInstance.setTraderId(2);
                  const expected = overLimit(2);
                  investorInstance.transaction(100000);
                  const actual = investorInstance.transaction(-50000);
                  expect(actual).to.deep.equal(expected);
      });
});
describe('Stocktrader edge case testing', () => {
            it('(regular input storting) should return a balance of 3000' , () => {
                  const expected = 1000;
                  const actual = stocktrader().transaction(1000);
                  expect(actual.newBalance).to.deep.equal(expected);
            });
            it('(Outer limit storting) should return a balance of 500' , () => {
                  const expected = 500;
                  const actual = stocktrader().transaction(500);
                  expect(actual.newBalance).to.deep.equal(expected);
            });
            it('(Outer limit storting) should return a balance of 2000' , () => {
                  const expected = 2000;
                  const actual = stocktrader().transaction(2000);
                  expect(actual.newBalance).to.deep.equal(expected);
            });
            it('(Over limit storting) should return: Transaction { _traderId: 3 }' , () => {
                  const expected = overLimit(3);
                  const actual = stocktrader().transaction(499);
                  expect(actual).to.deep.equal(expected);
            });
            it('(Over limit storting) should return: Transaction { _traderId: 3 }' , () => {
                  const expected = overLimit(3);
                  const actual = stocktrader().transaction(2001);
                  expect(actual).to.deep.equal(expected);
            });
            it('(regular input transactie) should return a balance of -1000' , () => {
                  const expected = -1000;
                  const actual = stocktrader().transaction(-1000); 
                  expect(actual.newBalance).to.deep.equal(expected);
            });
            it('(Outer limit transactie) should return a balance of -500' , () => {
                  const expected = -500;
                  const actual = stocktrader().transaction(-500);
                  expect(actual.newBalance).to.deep.equal(expected);
            });
            it('(Outer limit transactie) should return a balance of -2000' , () => {
                  const expected = -2000;
                  const actual = stocktrader().transaction(-2000);
                  expect(actual.newBalance).to.deep.equal(expected);
            });
            it('(Over limit transactie) should return: Transaction { _traderId: 3 }' , () => {
                  const expected = overLimit(3);
                  const actual = stocktrader().transaction(-499);
                  expect(actual).to.deep.equal(expected);
            });
            it('(Over limit transactie) should return: Transaction { _traderId: 3 }' , () => {
                  const expected = overLimit(3);
                  const actual = stocktrader().transaction(-2001);
                  expect(actual).to.deep.equal(expected);
            });
});

// DAY TRADER

// Storting:
// Regular input:  3000;
// Outer Limits: 2000 & 200.000;
// Min & max: 1999 & 200.001;

// Transactie:
// Regular input: - 1800;
// Outer Limits: -1000 & -2000;
// Min & Max: -999 & -2001


//INVESTOR

// Balance:
// Min: -1;
// Regular input: 1000;

// Storting:
// Regular input:  60.000;
// Min: 49.999;

// Transactie:
// Regular input: -10.000;
// Outer limit: -25.000;
// Max: -25.001;

// STOCK TRADER

// Storting:
// Regular input: 1000;
// Outer Limits: 500 & 2000;
// Min & Max: 499 & 2001;

// Transactie:
// Regular input: 1000;
// Outer Limits: -500 & -2000;
// Min & Max: -499 & -2001;
