/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AppHealthInfrastructureProviderModel } from '@app/app-health/infrastructure-provider';

@Table({
    modelName: 'AppHealthInfrastructureService',
    freezeTableName: true,
    timestamps: false,
})
export class AppHealthInfrastructureServiceModel extends Model<AppHealthInfrastructureServiceModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @ForeignKey(() => AppHealthInfrastructureProviderModel)
    @Column({
        field: 'providerId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    providerId: string;

    @BelongsTo(() => AppHealthInfrastructureProviderModel, {
        constraints: false,
        foreignKey: 'providerId',
    })
    provider: AppHealthInfrastructureProviderModel;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    name: string;

    @Column({
        field: 'score',
        allowNull: false,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    score: number;

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
