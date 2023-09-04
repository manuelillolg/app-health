import { Pagination } from '@api/graphql';
import { AppHealthPaginateApplicationsQuery } from '@app/app-health/application';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthPaginateApplicationsHandler
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
        return await this.queryBus.ask(new AppHealthPaginateApplicationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
