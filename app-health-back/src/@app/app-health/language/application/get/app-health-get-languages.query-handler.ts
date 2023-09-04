import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthLanguageResponse } from '../../domain/app-health-language.response';
import { AppHealthLanguageMapper } from '../../domain/app-health-language.mapper';
import { AppHealthGetLanguagesQuery } from './app-health-get-languages.query';
import { AppHealthGetLanguagesService } from './app-health-get-languages.service';

@QueryHandler(AppHealthGetLanguagesQuery)
export class AppHealthGetLanguagesQueryHandler implements IQueryHandler<AppHealthGetLanguagesQuery>
{
    private readonly mapper: AppHealthLanguageMapper = new AppHealthLanguageMapper();

    constructor(
        private readonly getLanguagesService: AppHealthGetLanguagesService,
    ) {}

    async execute(query: AppHealthGetLanguagesQuery): Promise<AppHealthLanguageResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getLanguagesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
