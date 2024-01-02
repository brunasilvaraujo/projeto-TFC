import { Request, Response } from 'express';
import TeamService from '../service/TeamService';
import mapStatusHTTP from '../utils/mapStausHTTP';

export default class TeamController {
  constructor(
    private teamsService = new TeamService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamsService.getAllTeams();
    res.status(200).json(serviceResponse.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.teamsService.getTeamById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }
}
