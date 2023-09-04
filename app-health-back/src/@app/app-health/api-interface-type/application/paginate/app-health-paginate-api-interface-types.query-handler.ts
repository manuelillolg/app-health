import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateApiInterfaceTypesQuery } from './app-health-paginate-api-interface-types.query';
import { AppHealthPaginateApiInterfaceTypesService } from './app-health-paginate-api-interface-types.service';

@QueryHandler(AppHealthPaginateApiInterfaceTypesQuery)
export class AppHealthPaginateApiInterfaceTypesQueryHandler implements IQueryHandler<AppHealthPaginateApiInterfaceTypesQuery>
{
    constructor(
        private readonly paginateApiInterfaceTypesService: AppHealthPaginateApiInterfaceTypesService,
    ) {}

    async execute(query: AppHealthPaginateApiInterfaceTypesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateApiInterfaceTypesService.main(
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
