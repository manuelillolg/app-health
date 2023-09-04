import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateLanguagesQuery } from './app-health-paginate-languages.query';
import { AppHealthPaginateLanguagesService } from './app-health-paginate-languages.service';

@QueryHandler(AppHealthPaginateLanguagesQuery)
export class AppHealthPaginateLanguagesQueryHandler implements IQueryHandler<AppHealthPaginateLanguagesQuery>
{
    constructor(
        private readonly paginateLanguagesService: AppHealthPaginateLanguagesService,
    ) {}

    async execute(query: AppHealthPaginateLanguagesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateLanguagesService.main(
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
