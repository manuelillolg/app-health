import { AppHealthDatabase, AppHealthDatabaseMapper, AppHealthDatabaseModel, AppHealthIDatabaseRepository } from '@app/app-health/database';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeDatabaseRepository extends SequelizeRepository<AppHealthDatabase, AppHealthDatabaseModel> implements AppHealthIDatabaseRepository
{
    public readonly aggregateName: string = 'AppHealthDatabase';
    public readonly mapper: AppHealthDatabaseMapper = new AppHealthDatabaseMapper();

    constructor(
        @InjectModel(AppHealthDatabaseModel)
        public readonly repository: typeof AppHealthDatabaseModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
