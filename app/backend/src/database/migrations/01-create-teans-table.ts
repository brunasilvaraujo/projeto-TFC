import { Model, QueryInterface, DataTypes } from 'sequelize';
import { ITeans } from '../../Interfaces/ITeans';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeans>>('teans', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teansName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teans');
  },
};
