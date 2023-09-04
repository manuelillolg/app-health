import { AppHealthILanguageRepository, AppHealthLanguage, AppHealthLanguageMapper, AppHealthLanguageModel } from '@app/app-health/language';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppHealthSequelizeLanguageRepository extends SequelizeRepository<AppHealthLanguage, AppHealthLanguageModel> implements AppHealthILanguageRepository
{
    public readonly aggregateName: string = 'AppHealthLanguage';
    public readonly mapper: AppHealthLanguageMapper = new AppHealthLanguageMapper();

    constructor(
        @InjectModel(AppHealthLanguageModel)
        public readonly repository: typeof AppHealthLanguageModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
