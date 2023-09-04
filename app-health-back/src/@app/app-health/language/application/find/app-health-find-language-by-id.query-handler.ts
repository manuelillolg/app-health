import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthLanguageResponse } from '../../domain/app-health-language.response';
import { AppHealthLanguageMapper } from '../../domain/app-health-language.mapper';
import { AppHealthLanguageId } from '../../domain/value-objects';
import { AppHealthFindLanguageByIdQuery } from './app-health-find-language-by-id.query';
import { AppHealthFindLanguageByIdService } from './app-health-find-language-by-id.service';

@QueryHandler(AppHealthFindLanguageByIdQuery)
export class AppHealthFindLanguageByIdQueryHandler implements IQueryHandler<AppHealthFindLanguageByIdQuery>
{
    private readonly mapper: AppHealthLanguageMapper = new AppHealthLanguageMapper();

    constructor(
        private readonly findLanguageByIdService: AppHealthFindLanguageByIdService,
    ) {}

    async execute(query: AppHealthFindLanguageByIdQuery): Promise<AppHealthLanguageResponse>
    {
        const language = await this.findLanguageByIdService.main(
            new AppHealthLanguageId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(language);
    }
}
