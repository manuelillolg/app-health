import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateDatabasesQuery } from './app-health-paginate-databases.query';
import { AppHealthPaginateDatabasesService } from './app-health-paginate-databases.service';

@QueryHandler(AppHealthPaginateDatabasesQuery)
export class AppHealthPaginateDatabasesQueryHandler implements IQueryHandler<AppHealthPaginateDatabasesQuery>
{
    constructor(
        private readonly paginateDatabasesService: AppHealthPaginateDatabasesService,
    ) {}

    async execute(query: AppHealthPaginateDatabasesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateDatabasesService.main(
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
