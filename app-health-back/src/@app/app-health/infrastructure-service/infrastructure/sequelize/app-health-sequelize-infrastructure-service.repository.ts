import { AppHealthIInfrastructureServiceRepository, AppHealthInfrastructureService, AppHealthInfrastructureServiceMapper, AppHealthInfrastructureServiceModel } from '@app/app-health/infrastructure-service';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeInfrastructureServiceRepository extends SequelizeRepository<AppHealthInfrastructureService, AppHealthInfrastructureServiceModel> implements AppHealthIInfrastructureServiceRepository
{
    public readonly aggregateName: string = 'AppHealthInfrastructureService';
    public readonly mapper: AppHealthInfrastructureServiceMapper = new AppHealthInfrastructureServiceMapper();

    constructor(
        @InjectModel(AppHealthInfrastructureServiceModel)
        public readonly repository: typeof AppHealthInfrastructureServiceModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
