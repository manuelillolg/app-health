import { AppHealthApplicationView, AppHealthApplicationViewMapper, AppHealthApplicationViewModel, AppHealthIApplicationViewRepository } from '@app/app-health/application-view';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeApplicationViewRepository extends SequelizeRepository<AppHealthApplicationView, AppHealthApplicationViewModel> implements AppHealthIApplicationViewRepository
{
    public readonly aggregateName: string = 'AppHealthApplicationView';
    public readonly mapper: AppHealthApplicationViewMapper = new AppHealthApplicationViewMapper();

    constructor(
        @InjectModel(AppHealthApplicationViewModel)
        public readonly repository: typeof AppHealthApplicationViewModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
