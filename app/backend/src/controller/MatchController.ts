import { Request, Response } from 'express';
import MatchService from '../service/MacthService';

export default class MatchController {
  constructor(
    private matchesService = new MatchService(),
  ) { }

  public async findAll(req: Request, res: Response) {
    const serviceResponse = await this.matchesService.findAll();
    return res.status(200).json(serviceResponse.data);
  }
}
