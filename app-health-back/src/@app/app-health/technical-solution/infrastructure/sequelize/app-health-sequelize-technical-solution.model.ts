/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AppHealthCustomerModel } from '@app/app-health/customer';

@Table({
    modelName: 'AppHealthTechnicalSolution',
    freezeTableName: true,
    timestamps: false,
})
export class AppHealthTechnicalSolutionModel extends Model<AppHealthTechnicalSolutionModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @ForeignKey(() => AppHealthCustomerModel)
    @Column({
        field: 'customerId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    customerId: string;

    @BelongsTo(() => AppHealthCustomerModel, {
        constraints: false,
        foreignKey: 'customerId',
    })
    customer: AppHealthCustomerModel;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    name: string;

    @Column({
        field: 'description',
        allowNull: true,
        type: DataTypes.TEXT,
    })
    description: string;

    @Column({
        field: 'architectureDiagram',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    architectureDiagram: string;

    @Column({
        field: 'proposal',
        allowNull: true,
        type: DataTypes.TEXT,
    })
    proposal: string;

    @Column({
        field: 'createdAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    createdAt: string;

    @Column({
        field: 'updatedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    updatedAt: string;

    @Column({
        field: 'deletedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    deletedAt: string;

}
