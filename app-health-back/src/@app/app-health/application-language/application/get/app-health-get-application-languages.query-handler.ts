import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationLanguageResponse } from '../../domain/app-health-application-language.response';
import { AppHealthApplicationLanguageMapper } from '../../domain/app-health-application-language.mapper';
import { AppHealthGetApplicationLanguagesQuery } from './app-health-get-application-languages.query';
import { AppHealthGetApplicationLanguagesService } from './app-health-get-application-languages.service';

@QueryHandler(AppHealthGetApplicationLanguagesQuery)
export class AppHealthGetApplicationLanguagesQueryHandler implements IQueryHandler<AppHealthGetApplicationLanguagesQuery>
{
    private readonly mapper: AppHealthApplicationLanguageMapper = new AppHealthApplicationLanguageMapper();

    constructor(
        private readonly getApplicationLanguagesService: AppHealthGetApplicationLanguagesService,
    ) {}

    async execute(query: AppHealthGetApplicationLanguagesQuery): Promise<AppHealthApplicationLanguageResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getApplicationLanguagesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
