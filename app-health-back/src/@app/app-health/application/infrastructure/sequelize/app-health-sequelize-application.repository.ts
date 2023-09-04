import { AppHealthApplication, AppHealthApplicationMapper, AppHealthApplicationModel, AppHealthIApplicationRepository } from '@app/app-health/application';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeApplicationRepository extends SequelizeRepository<AppHealthApplication, AppHealthApplicationModel> implements AppHealthIApplicationRepository
{
    public readonly aggregateName: string = 'AppHealthApplication';
    public readonly mapper: AppHealthApplicationMapper = new AppHealthApplicationMapper();

    constructor(
        @InjectModel(AppHealthApplicationModel)
        public readonly repository: typeof AppHealthApplicationModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
