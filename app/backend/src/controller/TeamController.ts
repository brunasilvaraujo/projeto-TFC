import { Request, Response } from 'express';
import TeamService from '../service/TeamService';

export default class TeamController {
  constructor(
    private teamsService = new TeamService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamsService.getAllTeams();
    res.status(200).json(serviceResponse.data);
  }
}
