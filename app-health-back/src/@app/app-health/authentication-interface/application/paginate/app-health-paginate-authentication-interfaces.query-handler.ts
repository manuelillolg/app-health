import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AppHealthPaginateAuthenticationInterfacesQuery } from './app-health-paginate-authentication-interfaces.query';
import { AppHealthPaginateAuthenticationInterfacesService } from './app-health-paginate-authentication-interfaces.service';

@QueryHandler(AppHealthPaginateAuthenticationInterfacesQuery)
export class AppHealthPaginateAuthenticationInterfacesQueryHandler implements IQueryHandler<AppHealthPaginateAuthenticationInterfacesQuery>
{
    constructor(
        private readonly paginateAuthenticationInterfacesService: AppHealthPaginateAuthenticationInterfacesService,
    ) {}

    async execute(query: AppHealthPaginateAuthenticationInterfacesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAuthenticationInterfacesService.main(
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
