import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class TeansModel extends Model<InferAttributes<TeansModel>, InferCreationAttributes<TeansModel>> {
  declare id: CreationOptional<number>;
  declare teansName: string;
}

TeansModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teansName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teans',
  timestamps: false,
  underscored: true,
});
