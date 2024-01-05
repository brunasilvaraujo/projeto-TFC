import { IMatch } from '../Interfaces/matches/IMatch';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MacthesModel';

export default class MatchModel {
  private model = MatchesModel;

  public async findAll() {
    const dbData = await this.model.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }

  public async matchesProgress(status: boolean): Promise<IMatch[]> {
    const dbData = this.model.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: {
        inProgress: status,
      },
    });

    return dbData;
  }
}
