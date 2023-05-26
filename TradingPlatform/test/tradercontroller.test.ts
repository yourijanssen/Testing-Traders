import { DaoUser } from "../src/database/DaoUser";
import * as tssinon from "ts-sinon";
import { DaoFund } from "../src/database/DaoFund";
import { assert, expect } from "chai";
import { app, initTraderController } from "../src/server";
import { TraderService } from "../src/models/traderService";
// import { response, Response } from 'express';
import request, {Response} from 'supertest';

//supertest

describe('GET /trader/:id', () => {
      const sandbox = tssinon.default.createSandbox();
      //daoUser 
      const daoUser: DaoUser = new DaoUser();
      let daoUserStub = null;
      //daoFund
      const daoFund: DaoFund = new DaoFund();
      let daoFundStub = null;
      //traderService
      //spy
      let spy = null;
      
      beforeEach(function () {
        daoUserStub = tssinon.stubObject<DaoUser>(daoUser); 
          
        //daoUserStub
        daoUserStub.getTraderID.returns(
            Promise.resolve(1)
        ); 
              
        daoUserStub.getAllTraderIDs.returns(
            Promise.resolve([1, 2, 3])
            );
                  
        daoUserStub.getFundIdForTrader.returns(
            Promise.resolve(1)
            );
                
        daoUserStub.getMetaDataForTrader.returns(
            Promise.resolve([1, 1])
        );
            
        //daoFundStub
        daoFundStub = tssinon.stubObject<DaoFund>(daoFund);
        daoFundStub.getFundForTrader.returns(
            Promise.resolve(1)
        );
        let traderService: TraderService = new TraderService(daoUserStub, daoFundStub);        
        spy = tssinon.default.spy(traderService, "getTraderById");
            initTraderController(traderService)
        });
     
        afterEach(function () {
            sandbox.restore();        
            tssinon.default.restore();
        });
  
        it('Get the correct trader information for the id 1', async () => {
            let res: Response = await request(app).get('/trader/1');
            expect(res.statusCode).equals(200);
            expect(JSON.stringify(res.body)).equals('{"fund":1,"traderId":1}');
            assert(spy.calledOnce);
        });
  });


  
  