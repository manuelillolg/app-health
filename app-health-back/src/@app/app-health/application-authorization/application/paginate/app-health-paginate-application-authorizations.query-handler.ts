import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateApplicationAuthorizationsQuery } from './app-health-paginate-application-authorizations.query';
import { AppHealthPaginateApplicationAuthorizationsService } from './app-health-paginate-application-authorizations.service';

@QueryHandler(AppHealthPaginateApplicationAuthorizationsQuery)
export class AppHealthPaginateApplicationAuthorizationsQueryHandler implements IQueryHandler<AppHealthPaginateApplicationAuthorizationsQuery>
{
    constructor(
        private readonly paginateApplicationAuthorizationsService: AppHealthPaginateApplicationAuthorizationsService,
    ) {}

    async execute(query: AppHealthPaginateApplicationAuthorizationsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateApplicationAuthorizationsService.main(
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
