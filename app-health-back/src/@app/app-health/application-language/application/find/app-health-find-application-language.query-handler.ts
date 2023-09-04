import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationLanguageResponse } from '../../domain/app-health-application-language.response';
import { AppHealthApplicationLanguageMapper } from '../../domain/app-health-application-language.mapper';
import { AppHealthFindApplicationLanguageQuery } from './app-health-find-application-language.query';
import { AppHealthFindApplicationLanguageService } from './app-health-find-application-language.service';

@QueryHandler(AppHealthFindApplicationLanguageQuery)
export class AppHealthFindApplicationLanguageQueryHandler implements IQueryHandler<AppHealthFindApplicationLanguageQuery>
{
    private readonly mapper: AppHealthApplicationLanguageMapper = new AppHealthApplicationLanguageMapper();

    constructor(
        private readonly findApplicationLanguageService: AppHealthFindApplicationLanguageService,
    ) {}

    async execute(query: AppHealthFindApplicationLanguageQuery): Promise<AppHealthApplicationLanguageResponse>
    {
        const applicationLanguage = await this.findApplicationLanguageService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationLanguage);
    }
}
