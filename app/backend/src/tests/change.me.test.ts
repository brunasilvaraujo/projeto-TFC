import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamsModel';

import { Response } from 'superagent';
import { mockTeam } from './mocks/mockTeam';
import { mockMatches } from './mocks/mockMatches';
import MatchesModel from '../database/models/MacthesModel';
import { invalidEmail, invalidPassword, validToken } from './mocks/mockUser';

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
  });


});

describe('Matches test', () => {
  it('Se retorna all matches', async function () {
    const { body } = await chai.request(app).get('/matches').send();

    expect(body).to.be.an('array');
    expect(body).to.deep.equal(mockMatches);
  });

  it('Se retorna true inProgress', async function () {
    sinon.stub(MatchesModel, 'findAll').resolves(mockMatches as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockMatches);
  });

  it('Se retorna true finished', async function () {
    sinon.stub(MatchesModel, 'findAll').resolves(mockMatches as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockMatches);
  });

  it('Se retorna CREATED com sucesso', async function () {
    sinon.stub(MatchesModel, 'create').resolves({} as any);
    const { status, body } = await chai.request(app).post('/matches').send({
      homeTeamId: 16,
      homeTeamGoals: 4,
      awayTeamId: 8,
      awayTeamGoals: 1,
    }).set('Authorization', validToken);

    expect(status).to.be.eq(201);
  });

  it('Se retorna CREATED como 422', async function () {
    sinon.stub(MatchesModel, 'create').resolves({} as any);
    const { status, body } = await chai.request(app).post('/matches').send({
      homeTeamId: 16,
      homeTeamGoals: 4,
      awayTeamId: 16,
      awayTeamGoals: 1,
    }).set('Authorization', validToken);

    expect(status).to.be.eq(422);
  });

  it('Se retorna CREATED como 404', async function () {
    sinon.stub(MatchesModel, 'create').resolves({} as any);
    const { status, body } = await chai.request(app).post('/matches').send({
      homeTeamId: 10000,
      homeTeamGoals: 4,
      awayTeamId: 16,
      awayTeamGoals: 1,
    }).set('Authorization', validToken);

    expect(status).to.be.eq(404);
  });

  it('Se retorna oken inválido', async function () {
    sinon.stub(MatchesModel, 'create').resolves({} as any);
    const { status, body } = await chai.request(app).post('/matches').send({
      homeTeamId: 10000,
      homeTeamGoals: 4,
      awayTeamId: 16,
      awayTeamGoals: 1,
    });

    expect(status).to.be.eq(401);
  });


});

describe('User/Login test', () => {
  it('Se o email é invalid', async function () {
    const { status, body } = await chai.request(app).post('/login').send(invalidEmail);

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });
  it('Se o passwordl é invalid', async function () {
    const { status, body } = await chai.request(app).post('/login').send(invalidPassword);

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });
  it('Se a rotarna usuario valid', async function () {
    const { body } = await chai.request(app).post('/login').send({
      email: "admin@admin.com",
      password: "secret_admin",
    })
    expect(body).to.have.property('token');
  });
  it('Se a rotarna usuario invalid', async function () {
    const { body } = await chai.request(app).post('/login').send({
      email: "@admin.com",
      password: "_admin",
    })
    expect(body).to.have.property('message');
  });
  it('Se a rotarna role', async function () {
    const { status, body } = await chai.request(app).post('/login/role').set('Authorization', validToken);
    expect(status).to.be.eq(200);
    expect(body).to.be.equal({ role: 'admin' });
  });
});
