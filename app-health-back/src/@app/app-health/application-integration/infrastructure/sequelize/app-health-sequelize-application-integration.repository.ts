import { AppHealthApplicationIntegration, AppHealthApplicationIntegrationMapper, AppHealthApplicationIntegrationModel, AppHealthIApplicationIntegrationRepository } from '@app/app-health/application-integration';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeApplicationIntegrationRepository extends SequelizeRepository<AppHealthApplicationIntegration, AppHealthApplicationIntegrationModel> implements AppHealthIApplicationIntegrationRepository
{
    public readonly aggregateName: string = 'AppHealthApplicationIntegration';
    public readonly mapper: AppHealthApplicationIntegrationMapper = new AppHealthApplicationIntegrationMapper();

    constructor(
        @InjectModel(AppHealthApplicationIntegrationModel)
        public readonly repository: typeof AppHealthApplicationIntegrationModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
