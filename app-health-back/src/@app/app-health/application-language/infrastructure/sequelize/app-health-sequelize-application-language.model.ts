/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AppHealthApplicationModel } from '@app/app-health/application';
import { AppHealthLanguageModel } from '@app/app-health/language';

@Table({
    modelName: 'AppHealthApplicationLanguage',
    freezeTableName: true,
    timestamps: false,
})
export class AppHealthApplicationLanguageModel extends Model<AppHealthApplicationLanguageModel>
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

    @ForeignKey(() => AppHealthLanguageModel)
    @Column({
        field: 'languageId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    languageId: string;

    @BelongsTo(() => AppHealthLanguageModel, {
        constraints: false,
        foreignKey: 'languageId',
    })
    language: AppHealthLanguageModel;

    @Column({
        field: 'version',
        allowNull: false,
        type: DataTypes.STRING(20),
    })
    version: string;

    @Column({
        field: 'score',
        allowNull: false,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    score: number;

    @Column({
        field: 'codeQualityScore',
        allowNull: false,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    codeQualityScore: number;

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
