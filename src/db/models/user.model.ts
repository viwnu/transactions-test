import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ timestamps: false, createdAt: false, updatedAt: false })
export class User extends Model {
  @Column({ type: DataType.INTEGER, allowNull: false })
  balance: number;
}
