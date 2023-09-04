import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateApplicationDatabasesQuery } from './app-health-paginate-application-databases.query';
import { AppHealthPaginateApplicationDatabasesService } from './app-health-paginate-application-databases.service';

@QueryHandler(AppHealthPaginateApplicationDatabasesQuery)
export class AppHealthPaginateApplicationDatabasesQueryHandler implements IQueryHandler<AppHealthPaginateApplicationDatabasesQuery>
{
    constructor(
        private readonly paginateApplicationDatabasesService: AppHealthPaginateApplicationDatabasesService,
    ) {}

    async execute(query: AppHealthPaginateApplicationDatabasesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateApplicationDatabasesService.main(
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
