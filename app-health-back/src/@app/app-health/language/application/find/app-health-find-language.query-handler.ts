import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthLanguageResponse } from '../../domain/app-health-language.response';
import { AppHealthLanguageMapper } from '../../domain/app-health-language.mapper';
import { AppHealthFindLanguageQuery } from './app-health-find-language.query';
import { AppHealthFindLanguageService } from './app-health-find-language.service';

@QueryHandler(AppHealthFindLanguageQuery)
export class AppHealthFindLanguageQueryHandler implements IQueryHandler<AppHealthFindLanguageQuery>
{
    private readonly mapper: AppHealthLanguageMapper = new AppHealthLanguageMapper();

    constructor(
        private readonly findLanguageService: AppHealthFindLanguageService,
    ) {}

    async execute(query: AppHealthFindLanguageQuery): Promise<AppHealthLanguageResponse>
    {
        const language = await this.findLanguageService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(language);
    }
}
