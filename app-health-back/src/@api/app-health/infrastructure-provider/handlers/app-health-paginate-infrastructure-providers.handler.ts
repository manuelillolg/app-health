import { Pagination } from '@api/graphql';
import { AppHealthPaginateInfrastructureProvidersQuery } from '@app/app-health/infrastructure-provider';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthPaginateInfrastructureProvidersHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new AppHealthPaginateInfrastructureProvidersQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
