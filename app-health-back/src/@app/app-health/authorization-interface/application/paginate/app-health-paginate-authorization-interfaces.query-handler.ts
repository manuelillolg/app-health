import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateAuthorizationInterfacesQuery } from './app-health-paginate-authorization-interfaces.query';
import { AppHealthPaginateAuthorizationInterfacesService } from './app-health-paginate-authorization-interfaces.service';

@QueryHandler(AppHealthPaginateAuthorizationInterfacesQuery)
export class AppHealthPaginateAuthorizationInterfacesQueryHandler implements IQueryHandler<AppHealthPaginateAuthorizationInterfacesQuery>
{
    constructor(
        private readonly paginateAuthorizationInterfacesService: AppHealthPaginateAuthorizationInterfacesService,
    ) {}

    async execute(query: AppHealthPaginateAuthorizationInterfacesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAuthorizationInterfacesService.main(
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
