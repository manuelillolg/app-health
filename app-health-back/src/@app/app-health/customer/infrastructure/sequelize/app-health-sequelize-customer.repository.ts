import { AppHealthCustomer, AppHealthCustomerMapper, AppHealthCustomerModel, AppHealthICustomerRepository } from '@app/app-health/customer';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeCustomerRepository extends SequelizeRepository<AppHealthCustomer, AppHealthCustomerModel> implements AppHealthICustomerRepository
{
    public readonly aggregateName: string = 'AppHealthCustomer';
    public readonly mapper: AppHealthCustomerMapper = new AppHealthCustomerMapper();

    constructor(
        @InjectModel(AppHealthCustomerModel)
        public readonly repository: typeof AppHealthCustomerModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
