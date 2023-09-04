import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationLanguageResponse } from '../../domain/app-health-application-language.response';
import { AppHealthApplicationLanguageMapper } from '../../domain/app-health-application-language.mapper';
import { AppHealthApplicationLanguageId } from '../../domain/value-objects';
import { AppHealthFindApplicationLanguageByIdQuery } from './app-health-find-application-language-by-id.query';
import { AppHealthFindApplicationLanguageByIdService } from './app-health-find-application-language-by-id.service';

@QueryHandler(AppHealthFindApplicationLanguageByIdQuery)
export class AppHealthFindApplicationLanguageByIdQueryHandler implements IQueryHandler<AppHealthFindApplicationLanguageByIdQuery>
{
    private readonly mapper: AppHealthApplicationLanguageMapper = new AppHealthApplicationLanguageMapper();

    constructor(
        private readonly findApplicationLanguageByIdService: AppHealthFindApplicationLanguageByIdService,
    ) {}

    async execute(query: AppHealthFindApplicationLanguageByIdQuery): Promise<AppHealthApplicationLanguageResponse>
    {
        const applicationLanguage = await this.findApplicationLanguageByIdService.main(
            new AppHealthApplicationLanguageId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationLanguage);
    }
}
