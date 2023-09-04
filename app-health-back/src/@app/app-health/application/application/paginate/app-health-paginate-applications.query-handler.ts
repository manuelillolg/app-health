import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateApplicationsQuery } from './app-health-paginate-applications.query';
import { AppHealthPaginateApplicationsService } from './app-health-paginate-applications.service';

@QueryHandler(AppHealthPaginateApplicationsQuery)
export class AppHealthPaginateApplicationsQueryHandler implements IQueryHandler<AppHealthPaginateApplicationsQuery>
{
    constructor(
        private readonly paginateApplicationsService: AppHealthPaginateApplicationsService,
    ) {}

    async execute(query: AppHealthPaginateApplicationsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateApplicationsService.main(
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
