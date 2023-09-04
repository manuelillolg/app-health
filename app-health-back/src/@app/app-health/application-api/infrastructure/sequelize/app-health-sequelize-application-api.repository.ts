import { AppHealthApplicationApi, AppHealthApplicationApiMapper, AppHealthApplicationApiModel, AppHealthIApplicationApiRepository } from '@app/app-health/application-api';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeApplicationApiRepository extends SequelizeRepository<AppHealthApplicationApi, AppHealthApplicationApiModel> implements AppHealthIApplicationApiRepository
{
    public readonly aggregateName: string = 'AppHealthApplicationApi';
    public readonly mapper: AppHealthApplicationApiMapper = new AppHealthApplicationApiMapper();

    constructor(
        @InjectModel(AppHealthApplicationApiModel)
        public readonly repository: typeof AppHealthApplicationApiModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
