import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateApplicationIntegrationsQuery } from './app-health-paginate-application-integrations.query';
import { AppHealthPaginateApplicationIntegrationsService } from './app-health-paginate-application-integrations.service';

@QueryHandler(AppHealthPaginateApplicationIntegrationsQuery)
export class AppHealthPaginateApplicationIntegrationsQueryHandler implements IQueryHandler<AppHealthPaginateApplicationIntegrationsQuery>
{
    constructor(
        private readonly paginateApplicationIntegrationsService: AppHealthPaginateApplicationIntegrationsService,
    ) {}

    async execute(query: AppHealthPaginateApplicationIntegrationsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateApplicationIntegrationsService.main(
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
