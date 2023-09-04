/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AppHealthTechnicalSolutionModel } from '@app/app-health/technical-solution';
import { AppHealthApplicationViewModel } from '@app/app-health/application-view';
import { AppHealthApplicationAuthenticationModel } from '@app/app-health/application-authentication';
import { AppHealthApplicationAuthorizationModel } from '@app/app-health/application-authorization';
import { AppHealthApplicationLanguageModel } from '@app/app-health/application-language';
import { AppHealthApplicationInfrastructureServiceModel } from '@app/app-health/application-infrastructure-service';
import { AppHealthApplicationDatabaseModel } from '@app/app-health/application-database';
import { AppHealthApplicationApiModel } from '@app/app-health/application-api';
import { AppHealthApplicationIntegrationModel } from '@app/app-health/application-integration';

@Table({
    modelName: 'AppHealthApplication',
    freezeTableName: true,
    timestamps: false,
})
export class AppHealthApplicationModel extends Model<AppHealthApplicationModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @ForeignKey(() => AppHealthTechnicalSolutionModel)
    @Column({
        field: 'technicalSolutionId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    technicalSolutionId: string;

    @BelongsTo(() => AppHealthTechnicalSolutionModel, {
        constraints: false,
        foreignKey: 'technicalSolutionId',
    })
    technicalSolution: AppHealthTechnicalSolutionModel;

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
        field: 'businessImpact',
        allowNull: true,
        type: DataTypes.TEXT,
    })
    businessImpact: string;

    @Column({
        field: 'type',
        allowNull: false,
        type: DataTypes.ENUM('FRONTEND','SERVER','MOBILE','EMBEDDED'),
    })
    type: string;

    @Column({
        field: 'releaseDate',
        allowNull: true,
        type: DataTypes.DATE,
    })
    releaseDate: string;

    @Column({
        field: 'architectureDiagram',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    architectureDiagram: string;

    @Column({
        field: 'hasTenants',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    hasTenants: boolean;

    @Column({
        field: 'hasLicensing',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    hasLicensing: boolean;

    @Column({
        field: 'costLicensesPerYear',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    costLicensesPerYear: number;

    @Column({
        field: 'requestsPerDay',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    requestsPerDay: number;


    @HasMany(() => AppHealthApplicationViewModel, {
        constraints: false,
    })
    views: AppHealthApplicationViewModel[];


    @HasMany(() => AppHealthApplicationAuthenticationModel, {
        constraints: false,
    })
    authentications: AppHealthApplicationAuthenticationModel[];


    @HasMany(() => AppHealthApplicationAuthorizationModel, {
        constraints: false,
    })
    authorizations: AppHealthApplicationAuthorizationModel[];


    @HasMany(() => AppHealthApplicationLanguageModel, {
        constraints: false,
    })
    languages: AppHealthApplicationLanguageModel[];


    @HasMany(() => AppHealthApplicationInfrastructureServiceModel, {
        constraints: false,
    })
    infrastructureServices: AppHealthApplicationInfrastructureServiceModel[];


    @HasMany(() => AppHealthApplicationDatabaseModel, {
        constraints: false,
    })
    databases: AppHealthApplicationDatabaseModel[];


    @HasMany(() => AppHealthApplicationApiModel, {
        constraints: false,
    })
    apis: AppHealthApplicationApiModel[];


    @HasMany(() => AppHealthApplicationIntegrationModel, {
        constraints: false,
    })
    integrations: AppHealthApplicationIntegrationModel[];

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
