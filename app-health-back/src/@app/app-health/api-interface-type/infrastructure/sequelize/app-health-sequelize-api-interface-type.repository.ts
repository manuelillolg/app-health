import { AppHealthApiInterfaceType, AppHealthApiInterfaceTypeMapper, AppHealthApiInterfaceTypeModel, AppHealthIApiInterfaceTypeRepository } from '@app/app-health/api-interface-type';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeApiInterfaceTypeRepository extends SequelizeRepository<AppHealthApiInterfaceType, AppHealthApiInterfaceTypeModel> implements AppHealthIApiInterfaceTypeRepository
{
    public readonly aggregateName: string = 'AppHealthApiInterfaceType';
    public readonly mapper: AppHealthApiInterfaceTypeMapper = new AppHealthApiInterfaceTypeMapper();

    constructor(
        @InjectModel(AppHealthApiInterfaceTypeModel)
        public readonly repository: typeof AppHealthApiInterfaceTypeModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
