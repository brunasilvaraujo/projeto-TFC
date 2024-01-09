import { IMatch } from '../Interfaces/matches/IMatch';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MacthesModel';

export default class MatchModel {
  private model = MatchesModel;
  private teamModel = new TeamsModel();

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

  public async findById(id: IMatch['id']): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId, inProgress }: IMatch = dbData;
    return { id, awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId, inProgress };
  }

  public async finishedMatchers(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  public async updateMatchers(
    id: IMatch['id'],
    data: IMatch,
  ): Promise<IMatch | null> {
    const dbData = await this.model.update(data, { where: { id } });
    if (!dbData) return null;

    return this.findById(id);
  }
}
