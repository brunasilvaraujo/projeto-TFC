import { Request, Response } from 'express';
import MatchService from '../service/MacthService';

export default class MatchController {
  constructor(
    private matchesService = new MatchService(),
  ) { }

  public async findAllMatchers(req: Request, res: Response) {
    const { inProgress } = req.query;

    const progress = typeof inProgress === 'string' ? inProgress : undefined;

    const allMatch = await this.matchesService.findAll(progress);

    res.status(200).json(allMatch.data);
  }
}
