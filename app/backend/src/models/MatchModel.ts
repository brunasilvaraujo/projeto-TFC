import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MacthesModel';

export default class MatchModel {
  private model = MatchesModel;

  async findAll() {
    const dbData = await this.model.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }
}
