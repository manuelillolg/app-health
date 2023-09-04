/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AppHealthApplicationModel } from '@app/app-health/application';
import { AppHealthAuthorizationInterfaceModel } from '@app/app-health/authorization-interface';
import { AppHealthApplicationInfrastructureServiceModel } from '@app/app-health/application-infrastructure-service';

@Table({
    modelName: 'AppHealthApplicationAuthorization',
    freezeTableName: true,
    timestamps: false,
})
export class AppHealthApplicationAuthorizationModel extends Model<AppHealthApplicationAuthorizationModel>
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

    @ForeignKey(() => AppHealthAuthorizationInterfaceModel)
    @Column({
        field: 'authorizationInterfaceId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    authorizationInterfaceId: string;

    @BelongsTo(() => AppHealthAuthorizationInterfaceModel, {
        constraints: false,
        foreignKey: 'authorizationInterfaceId',
    })
    authorizationInterface: AppHealthAuthorizationInterfaceModel;

    @Column({
        field: 'totalUsers',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    totalUsers: number;

    @Column({
        field: 'score',
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    score: number;

    @ForeignKey(() => AppHealthApplicationInfrastructureServiceModel)
    @Column({
        field: 'applicationInfrastructureServiceId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    applicationInfrastructureServiceId: string;

    @BelongsTo(() => AppHealthApplicationInfrastructureServiceModel, {
        constraints: false,
        foreignKey: 'applicationInfrastructureServiceId',
    })
    applicationInfrastructureService: AppHealthApplicationInfrastructureServiceModel;

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
