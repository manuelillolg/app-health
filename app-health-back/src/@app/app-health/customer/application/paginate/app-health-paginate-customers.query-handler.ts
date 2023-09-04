import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateCustomersQuery } from './app-health-paginate-customers.query';
import { AppHealthPaginateCustomersService } from './app-health-paginate-customers.service';

@QueryHandler(AppHealthPaginateCustomersQuery)
export class AppHealthPaginateCustomersQueryHandler implements IQueryHandler<AppHealthPaginateCustomersQuery>
{
    constructor(
        private readonly paginateCustomersService: AppHealthPaginateCustomersService,
    ) {}

    async execute(query: AppHealthPaginateCustomersQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateCustomersService.main(
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
