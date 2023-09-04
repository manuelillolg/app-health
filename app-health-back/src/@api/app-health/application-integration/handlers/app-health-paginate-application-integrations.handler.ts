import { Pagination } from '@api/graphql';
import { AppHealthPaginateApplicationIntegrationsQuery } from '@app/app-health/application-integration';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthPaginateApplicationIntegrationsHandler
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
        return await this.queryBus.ask(new AppHealthPaginateApplicationIntegrationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
