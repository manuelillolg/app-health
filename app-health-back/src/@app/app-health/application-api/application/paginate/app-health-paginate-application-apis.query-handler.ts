import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateApplicationApisQuery } from './app-health-paginate-application-apis.query';
import { AppHealthPaginateApplicationApisService } from './app-health-paginate-application-apis.service';

@QueryHandler(AppHealthPaginateApplicationApisQuery)
export class AppHealthPaginateApplicationApisQueryHandler implements IQueryHandler<AppHealthPaginateApplicationApisQuery>
{
    constructor(
        private readonly paginateApplicationApisService: AppHealthPaginateApplicationApisService,
    ) {}

    async execute(query: AppHealthPaginateApplicationApisQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateApplicationApisService.main(
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
