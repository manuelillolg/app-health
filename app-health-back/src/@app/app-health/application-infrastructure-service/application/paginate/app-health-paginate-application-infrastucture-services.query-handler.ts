import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateApplicationInfrastuctureServicesQuery } from './app-health-paginate-application-infrastucture-services.query';
import { AppHealthPaginateApplicationInfrastuctureServicesService } from './app-health-paginate-application-infrastucture-services.service';

@QueryHandler(AppHealthPaginateApplicationInfrastuctureServicesQuery)
export class AppHealthPaginateApplicationInfrastuctureServicesQueryHandler implements IQueryHandler<AppHealthPaginateApplicationInfrastuctureServicesQuery>
{
    constructor(
        private readonly paginateApplicationInfrastuctureServicesService: AppHealthPaginateApplicationInfrastuctureServicesService,
    ) {}

    async execute(query: AppHealthPaginateApplicationInfrastuctureServicesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateApplicationInfrastuctureServicesService.main(
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
