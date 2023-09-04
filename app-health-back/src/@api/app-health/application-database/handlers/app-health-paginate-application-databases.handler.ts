import { Pagination } from '@api/graphql';
import { AppHealthPaginateApplicationDatabasesQuery } from '@app/app-health/application-database';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthPaginateApplicationDatabasesHandler
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
        return await this.queryBus.ask(new AppHealthPaginateApplicationDatabasesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
