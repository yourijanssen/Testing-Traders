import { expect } from "chai";
import { Fund } from "../src/models/fund";

describe("Testing all functions in fund.ts", () => {
      it("should be able to create a fund class instance", () => {
                  let fund = new Fund();
                  expect(fund).to.be.an.instanceOf(Fund);
        });
        it("should be able to set and get the fundId", () => {
                  let fund = new Fund();
                  fund.setFundId(1);
                  expect(fund.getFundId()).to.equal(1);
        });
        it("should be able to do a transaction", () => {
                  let fund = new Fund();
                  let transaction = fund.doTransaction(100);
                  expect(transaction.newBalance).to.equal(100);       
        });
        it("should be able to get the balance", () => {
                  let fund = new Fund();
                  fund.doTransaction(100);
                  expect(fund.getBalance()).to.equal(100);
        });
});