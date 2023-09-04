import { AppHealthIInfrastructureProviderRepository, AppHealthInfrastructureProvider, AppHealthInfrastructureProviderMapper, AppHealthInfrastructureProviderModel } from '@app/app-health/infrastructure-provider';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeInfrastructureProviderRepository extends SequelizeRepository<AppHealthInfrastructureProvider, AppHealthInfrastructureProviderModel> implements AppHealthIInfrastructureProviderRepository
{
    public readonly aggregateName: string = 'AppHealthInfrastructureProvider';
    public readonly mapper: AppHealthInfrastructureProviderMapper = new AppHealthInfrastructureProviderMapper();

    constructor(
        @InjectModel(AppHealthInfrastructureProviderModel)
        public readonly repository: typeof AppHealthInfrastructureProviderModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
