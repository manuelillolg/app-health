import { AppHealthAuthorizationInterface, AppHealthAuthorizationInterfaceMapper, AppHealthAuthorizationInterfaceModel, AppHealthIAuthorizationInterfaceRepository } from '@app/app-health/authorization-interface';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeAuthorizationInterfaceRepository extends SequelizeRepository<AppHealthAuthorizationInterface, AppHealthAuthorizationInterfaceModel> implements AppHealthIAuthorizationInterfaceRepository
{
    public readonly aggregateName: string = 'AppHealthAuthorizationInterface';
    public readonly mapper: AppHealthAuthorizationInterfaceMapper = new AppHealthAuthorizationInterfaceMapper();

    constructor(
        @InjectModel(AppHealthAuthorizationInterfaceModel)
        public readonly repository: typeof AppHealthAuthorizationInterfaceModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
