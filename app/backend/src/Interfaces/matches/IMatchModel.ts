import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  matchesInProgress(progress: boolean): Promise<IMatch[]>;
  finishedMatchers(id: number): Promise<void>;
}
