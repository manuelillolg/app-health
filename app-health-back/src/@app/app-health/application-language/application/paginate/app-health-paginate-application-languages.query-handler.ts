import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateApplicationLanguagesQuery } from './app-health-paginate-application-languages.query';
import { AppHealthPaginateApplicationLanguagesService } from './app-health-paginate-application-languages.service';

@QueryHandler(AppHealthPaginateApplicationLanguagesQuery)
export class AppHealthPaginateApplicationLanguagesQueryHandler implements IQueryHandler<AppHealthPaginateApplicationLanguagesQuery>
{
    constructor(
        private readonly paginateApplicationLanguagesService: AppHealthPaginateApplicationLanguagesService,
    ) {}

    async execute(query: AppHealthPaginateApplicationLanguagesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateApplicationLanguagesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}
