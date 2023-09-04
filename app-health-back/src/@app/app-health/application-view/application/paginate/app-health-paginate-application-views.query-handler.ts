import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateApplicationViewsQuery } from './app-health-paginate-application-views.query';
import { AppHealthPaginateApplicationViewsService } from './app-health-paginate-application-views.service';

@QueryHandler(AppHealthPaginateApplicationViewsQuery)
export class AppHealthPaginateApplicationViewsQueryHandler implements IQueryHandler<AppHealthPaginateApplicationViewsQuery>
{
    constructor(
        private readonly paginateApplicationViewsService: AppHealthPaginateApplicationViewsService,
    ) {}

    async execute(query: AppHealthPaginateApplicationViewsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateApplicationViewsService.main(
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
