/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AppHealthApplicationModel } from '@app/app-health/application';

@Table({
    modelName: 'AppHealthApplicationView',
    freezeTableName: true,
    timestamps: false,
})
export class AppHealthApplicationViewModel extends Model<AppHealthApplicationViewModel>
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

    @Column({
        field: 'totalViews',
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    totalViews: number;

    @Column({
        field: 'complexity',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    complexity: string;

    @Column({
        field: 'description',
        allowNull: true,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    description: number;

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
