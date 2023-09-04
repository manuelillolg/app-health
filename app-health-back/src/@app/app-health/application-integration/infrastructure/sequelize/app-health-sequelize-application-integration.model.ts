/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AppHealthApplicationModel } from '@app/app-health/application';
import { AppHealthApiInterfaceTypeModel } from '@app/app-health/api-interface-type';

@Table({
    modelName: 'AppHealthApplicationIntegration',
    freezeTableName: true,
    timestamps: false,
})
export class AppHealthApplicationIntegrationModel extends Model<AppHealthApplicationIntegrationModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

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

    @ForeignKey(() => AppHealthApplicationModel)
    @Column({
        field: 'sourceApplicationId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    sourceApplicationId: string;

    @BelongsTo(() => AppHealthApplicationModel, {
        constraints: false,
        foreignKey: 'sourceApplicationId',
    })
    sourceApplication: AppHealthApplicationModel;

    @ForeignKey(() => AppHealthApplicationModel)
    @Column({
        field: 'targetApplicationId',
        allowNull: true,
        type: DataTypes.UUID,
    })
    targetApplicationId: string;

    @BelongsTo(() => AppHealthApplicationModel, {
        constraints: false,
        foreignKey: 'targetApplicationId',
    })
    targetApplication: AppHealthApplicationModel;

    @ForeignKey(() => AppHealthApiInterfaceTypeModel)
    @Column({
        field: 'apiInterfaceTypeId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    apiInterfaceTypeId: string;

    @BelongsTo(() => AppHealthApiInterfaceTypeModel, {
        constraints: false,
        foreignKey: 'apiInterfaceTypeId',
    })
    apiInterfaceType: AppHealthApiInterfaceTypeModel;

    @Column({
        field: 'interfaceNumbers',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    interfaceNumbers: number;

    @Column({
        field: 'modality',
        allowNull: false,
        type: DataTypes.ENUM('UNIDIRECTIONAL','BIDIRECTIONAL'),
    })
    modality: string;

    @Column({
        field: 'score',
        allowNull: false,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    score: number;

    @Column({
        field: 'documentations',
        allowNull: true,
        type: DataTypes.JSON,
    })
    documentations: any;

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
