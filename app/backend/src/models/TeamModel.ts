import TeamsModel from '../database/models/TeamsModel';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
// import { NewEntity } from '../Interfaces/index';

export default class TeamModel implements ITeamModel {
  private model = TeamsModel;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }
}
