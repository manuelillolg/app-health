import { AppHealthApplicationInfrastructureService, AppHealthApplicationInfrastructureServiceMapper, AppHealthApplicationInfrastructureServiceModel, AppHealthIApplicationInfrastructureServiceRepository } from '@app/app-health/application-infrastructure-service';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeApplicationInfrastructureServiceRepository extends SequelizeRepository<AppHealthApplicationInfrastructureService, AppHealthApplicationInfrastructureServiceModel> implements AppHealthIApplicationInfrastructureServiceRepository
{
    public readonly aggregateName: string = 'AppHealthApplicationInfrastructureService';
    public readonly mapper: AppHealthApplicationInfrastructureServiceMapper = new AppHealthApplicationInfrastructureServiceMapper();

    constructor(
        @InjectModel(AppHealthApplicationInfrastructureServiceModel)
        public readonly repository: typeof AppHealthApplicationInfrastructureServiceModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
