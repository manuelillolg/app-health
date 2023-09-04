import { AppHealthApplicationLanguage, AppHealthApplicationLanguageMapper, AppHealthApplicationLanguageModel, AppHealthIApplicationLanguageRepository } from '@app/app-health/application-language';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeApplicationLanguageRepository extends SequelizeRepository<AppHealthApplicationLanguage, AppHealthApplicationLanguageModel> implements AppHealthIApplicationLanguageRepository
{
    public readonly aggregateName: string = 'AppHealthApplicationLanguage';
    public readonly mapper: AppHealthApplicationLanguageMapper = new AppHealthApplicationLanguageMapper();

    constructor(
        @InjectModel(AppHealthApplicationLanguageModel)
        public readonly repository: typeof AppHealthApplicationLanguageModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
