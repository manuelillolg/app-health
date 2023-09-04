import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthLanguageResponse } from '../../domain/app-health-language.response';
import { AppHealthLanguageMapper } from '../../domain/app-health-language.mapper';
import { AppHealthRawSQLLanguagesQuery } from './app-health-raw-sql-languages.query';
import { AppHealthRawSQLLanguagesService } from './app-health-raw-sql-languages.service';

@QueryHandler(AppHealthRawSQLLanguagesQuery)
export class AppHealthRawSQLLanguagesQueryHandler implements IQueryHandler<AppHealthRawSQLLanguagesQuery>
{
    private readonly mapper: AppHealthLanguageMapper = new AppHealthLanguageMapper();

    constructor(
        private readonly rawSQLLanguagesService: AppHealthRawSQLLanguagesService,
    ) {}

    async execute(query: AppHealthRawSQLLanguagesQuery): Promise<AppHealthLanguageResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLLanguagesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
