import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateInfrastructureServicesQuery } from './app-health-paginate-infrastructure-services.query';
import { AppHealthPaginateInfrastructureServicesService } from './app-health-paginate-infrastructure-services.service';

@QueryHandler(AppHealthPaginateInfrastructureServicesQuery)
export class AppHealthPaginateInfrastructureServicesQueryHandler implements IQueryHandler<AppHealthPaginateInfrastructureServicesQuery>
{
    constructor(
        private readonly paginateInfrastructureServicesService: AppHealthPaginateInfrastructureServicesService,
    ) {}

    async execute(query: AppHealthPaginateInfrastructureServicesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateInfrastructureServicesService.main(
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
