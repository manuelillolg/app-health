import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateInfrastructureProvidersQuery } from './app-health-paginate-infrastructure-providers.query';
import { AppHealthPaginateInfrastructureProvidersService } from './app-health-paginate-infrastructure-providers.service';

@QueryHandler(AppHealthPaginateInfrastructureProvidersQuery)
export class AppHealthPaginateInfrastructureProvidersQueryHandler implements IQueryHandler<AppHealthPaginateInfrastructureProvidersQuery>
{
    constructor(
        private readonly paginateInfrastructureProvidersService: AppHealthPaginateInfrastructureProvidersService,
    ) {}

    async execute(query: AppHealthPaginateInfrastructureProvidersQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateInfrastructureProvidersService.main(
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
