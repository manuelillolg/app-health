import { Pagination } from '@api/graphql';
import { AppHealthPaginateApplicationViewsQuery } from '@app/app-health/application-view';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthPaginateApplicationViewsHandler
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
        return await this.queryBus.ask(new AppHealthPaginateApplicationViewsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
