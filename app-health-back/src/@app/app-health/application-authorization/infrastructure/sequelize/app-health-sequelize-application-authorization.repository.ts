import { AppHealthApplicationAuthorization, AppHealthApplicationAuthorizationMapper, AppHealthApplicationAuthorizationModel, AppHealthIApplicationAuthorizationRepository } from '@app/app-health/application-authorization';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeApplicationAuthorizationRepository extends SequelizeRepository<AppHealthApplicationAuthorization, AppHealthApplicationAuthorizationModel> implements AppHealthIApplicationAuthorizationRepository
{
    public readonly aggregateName: string = 'AppHealthApplicationAuthorization';
    public readonly mapper: AppHealthApplicationAuthorizationMapper = new AppHealthApplicationAuthorizationMapper();

    constructor(
        @InjectModel(AppHealthApplicationAuthorizationModel)
        public readonly repository: typeof AppHealthApplicationAuthorizationModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
