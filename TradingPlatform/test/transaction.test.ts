import { expect } from "chai";
import { Transaction } from "../src/models/transaction";

describe("Testing all functions in transaction.ts", () => {
    it("should be able to create a transaction class instance", () => {
            let transaction = new Transaction();
            expect(transaction).to.be.an.instanceOf(Transaction);
      });
      it("should be able to set and get the current date", () => {
            let transaction = new Transaction();
            transaction.setDate();
            expect(transaction.getDate()).to.be.a("string");
      });
      it("should be able to set and get the traderId", () => {
            let transaction = new Transaction();
            transaction.traderId = 1;
            expect(transaction.traderId).to.equal(1);
      });
      it("should be able to set and get the oldBalance", () => {
            let transaction = new Transaction();
            transaction.oldBalance = 100;
            expect(transaction.oldBalance).to.equal(100);
      });
      it("should be able to set and get the newBalance", () => {   
            let transaction = new Transaction();
            transaction.newBalance = 100;
            expect(transaction.newBalance).to.equal(100);
      });          
});
