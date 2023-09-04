import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateApplicationAuthenticationsQuery } from './app-health-paginate-application-authentications.query';
import { AppHealthPaginateApplicationAuthenticationsService } from './app-health-paginate-application-authentications.service';

@QueryHandler(AppHealthPaginateApplicationAuthenticationsQuery)
export class AppHealthPaginateApplicationAuthenticationsQueryHandler implements IQueryHandler<AppHealthPaginateApplicationAuthenticationsQuery>
{
    constructor(
        private readonly paginateApplicationAuthenticationsService: AppHealthPaginateApplicationAuthenticationsService,
    ) {}

    async execute(query: AppHealthPaginateApplicationAuthenticationsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateApplicationAuthenticationsService.main(
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
