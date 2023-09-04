/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AppHealthApplicationModel } from '@app/app-health/application';
import { AppHealthInfrastructureServiceModel } from '@app/app-health/infrastructure-service';

@Table({
    modelName: 'AppHealthApplicationInfrastructureService',
    freezeTableName: true,
    timestamps: false,
})
export class AppHealthApplicationInfrastructureServiceModel extends Model<AppHealthApplicationInfrastructureServiceModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @ForeignKey(() => AppHealthApplicationModel)
    @Column({
        field: 'applicationId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    applicationId: string;

    @BelongsTo(() => AppHealthApplicationModel, {
        constraints: false,
        foreignKey: 'applicationId',
    })
    application: AppHealthApplicationModel;

    @ForeignKey(() => AppHealthInfrastructureServiceModel)
    @Column({
        field: 'infrastructureServiceId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    infrastructureServiceId: string;

    @BelongsTo(() => AppHealthInfrastructureServiceModel, {
        constraints: false,
        foreignKey: 'infrastructureServiceId',
    })
    infrastructureService: AppHealthInfrastructureServiceModel;

    @Column({
        field: 'averageCostPerYear',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    averageCostPerYear: number;

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
