import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findById(id: IMatch['id']): Promise<IMatch | null>;
  matchesInProgress(progress: boolean): Promise<IMatch[]>;
  finishedMatchers(id: number): Promise<void>;
  updateMatchers(id: IMatch['id'],
    homeTeamGoals: number, awayTeamGoals: number): Promise<IMatch | null>;
}
