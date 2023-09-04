import { AppHealthApplicationAuthentication, AppHealthApplicationAuthenticationMapper, AppHealthApplicationAuthenticationModel, AppHealthIApplicationAuthenticationRepository } from '@app/app-health/application-authentication';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeApplicationAuthenticationRepository extends SequelizeRepository<AppHealthApplicationAuthentication, AppHealthApplicationAuthenticationModel> implements AppHealthIApplicationAuthenticationRepository
{
    public readonly aggregateName: string = 'AppHealthApplicationAuthentication';
    public readonly mapper: AppHealthApplicationAuthenticationMapper = new AppHealthApplicationAuthenticationMapper();

    constructor(
        @InjectModel(AppHealthApplicationAuthenticationModel)
        public readonly repository: typeof AppHealthApplicationAuthenticationModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
