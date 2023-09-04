import { AppHealthAuthenticationInterface, AppHealthAuthenticationInterfaceMapper, AppHealthAuthenticationInterfaceModel, AppHealthIAuthenticationInterfaceRepository } from '@app/app-health/authentication-interface';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeAuthenticationInterfaceRepository extends SequelizeRepository<AppHealthAuthenticationInterface, AppHealthAuthenticationInterfaceModel> implements AppHealthIAuthenticationInterfaceRepository
{
    public readonly aggregateName: string = 'AppHealthAuthenticationInterface';
    public readonly mapper: AppHealthAuthenticationInterfaceMapper = new AppHealthAuthenticationInterfaceMapper();

    constructor(
        @InjectModel(AppHealthAuthenticationInterfaceModel)
        public readonly repository: typeof AppHealthAuthenticationInterfaceModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
