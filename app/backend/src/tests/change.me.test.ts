import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamsModel';

import { Response } from 'superagent';
import { mockTeam } from './mocks/mockTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Seu sub-teste', () => {
    expect(true).to.be.eq(true);
  });

  it('Se retorna all teams', async function () {
    sinon.stub(TeamModel, 'findAll').resolves(mockTeam as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockTeam);
  });

  it('Se retorna um id de especifico', async function () {
    sinon.stub(TeamModel, 'findOne').resolves(mockTeam as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockTeam);
  });

  it('Se o livro não existe', async function () {
    sinon.stub(TeamModel, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(404);
    expect(body.message).to.equal('Team 1 not found');
  })
});
