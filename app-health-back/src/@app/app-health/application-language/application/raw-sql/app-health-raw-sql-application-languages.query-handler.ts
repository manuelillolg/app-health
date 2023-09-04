import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationLanguageResponse } from '../../domain/app-health-application-language.response';
import { AppHealthApplicationLanguageMapper } from '../../domain/app-health-application-language.mapper';
import { AppHealthRawSQLApplicationLanguagesQuery } from './app-health-raw-sql-application-languages.query';
import { AppHealthRawSQLApplicationLanguagesService } from './app-health-raw-sql-application-languages.service';

@QueryHandler(AppHealthRawSQLApplicationLanguagesQuery)
export class AppHealthRawSQLApplicationLanguagesQueryHandler implements IQueryHandler<AppHealthRawSQLApplicationLanguagesQuery>
{
    private readonly mapper: AppHealthApplicationLanguageMapper = new AppHealthApplicationLanguageMapper();

    constructor(
        private readonly rawSQLApplicationLanguagesService: AppHealthRawSQLApplicationLanguagesService,
    ) {}

    async execute(query: AppHealthRawSQLApplicationLanguagesQuery): Promise<AppHealthApplicationLanguageResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLApplicationLanguagesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
