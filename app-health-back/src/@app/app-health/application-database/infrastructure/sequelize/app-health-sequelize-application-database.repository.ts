import { AppHealthApplicationDatabase, AppHealthApplicationDatabaseMapper, AppHealthApplicationDatabaseModel, AppHealthIApplicationDatabaseRepository } from '@app/app-health/application-database';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeApplicationDatabaseRepository extends SequelizeRepository<AppHealthApplicationDatabase, AppHealthApplicationDatabaseModel> implements AppHealthIApplicationDatabaseRepository
{
    public readonly aggregateName: string = 'AppHealthApplicationDatabase';
    public readonly mapper: AppHealthApplicationDatabaseMapper = new AppHealthApplicationDatabaseMapper();

    constructor(
        @InjectModel(AppHealthApplicationDatabaseModel)
        public readonly repository: typeof AppHealthApplicationDatabaseModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
