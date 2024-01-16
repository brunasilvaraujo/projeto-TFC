import { IMatch } from '../matches/IMatch';

export default interface ILeaderboardModel {
  findAllLeaderboardHome(): Promise<IMatch[]>;
}
