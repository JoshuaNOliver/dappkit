import 'dotenv/config';
import {expect} from 'chai';
import {Web3Connection} from '@base/web3-connection';
import {Web3ConnectionOptions} from '@interfaces/web3-connection-options';
import {Errors} from '@interfaces/error-enum';
import {getPrivateKeyFromFile} from '../utils/';

describe(`Web3Connection`, () => {
  it(`start() fails because missing web3host`, () => {
    const web3Connection = new Web3Connection({autoStart: false});
    expect(() => web3Connection.start()).to.throw(Errors.MissingWeb3ProviderHost);
  });

  describe(`start() works`, () => {
    let web3Connection: Web3Connection;
    before(() => {
      const options: Web3ConnectionOptions = {
        web3Host: process.env.WEB3_HOST_PROVIDER || 'HTTP://127.0.0.1:8545',
        privateKey: process.env.WALLET_PRIVATE_KEY || getPrivateKeyFromFile(),
        skipWindowAssignment: true,
      }

      web3Connection = new Web3Connection(options);
    });

    it(`Starts`, () => {
      expect(() => web3Connection.start()).to.not.throw();
      expect(web3Connection.started).to.be.true;
    });

    it(`Has account Address`, () => {
      expect(web3Connection.Account.address).to.not.be.empty;
    })

    it(`gets balance`, async () => {
      expect(await web3Connection.getBalance()).to.not.be.empty;
    });

    it(`get ETHNetworkId`, async () => {
      expect(await web3Connection.getETHNetworkId()).to.exist;
    });

    it(`Has restartModelOnDeploy as true by default`, () => {
      expect(web3Connection.options.restartModelOnDeploy).to.be.true;
    })
  })
})
