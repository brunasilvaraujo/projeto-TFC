import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStausHTTP';
import MatchService from '../service/MacthService';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class MatchController {
  constructor(
    private matchesService = new MatchService(),
  ) { }

  public async findAllMatchers(req: Request, res: Response) {
    const { inProgress } = req.query;

    const progress = typeof inProgress === 'string' ? inProgress : undefined;

    const allMatch = await this.matchesService.findAll(progress);

    res.status(200).json(allMatch);
  }

  public async getMatchById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.matchesService.getMatchById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    res.status(200).json(serviceResponse.data);
  }

  public async finishedMatchers(req: Request, res: Response) {
    const { id } = req.params;

    await this.matchesService.finishedMatchers(Number(id));

    return res.status(200).send({ message: 'Finished' });
  }

  public async updateMatchers(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { homeTeamGoals, awayTeamGoals } = req.body;
    console.log(req.body);
    const { data } = await this.matchesService
      .updateMatchers(id, homeTeamGoals, awayTeamGoals);

    return res.status(200).send(data);
  }

  public async createMatchers(req: Request, res: Response) {
    const newMatchers = req.body as IMatch;

    const { status, data } = await this.matchesService.createMatchers(newMatchers);

    return res.status(mapStatusHTTP(status)).send(data);
  }
}
