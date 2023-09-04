import { Pagination } from '@api/graphql';
import { AppHealthPaginateDatabasesQuery } from '@app/app-health/database';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthPaginateDatabasesHandler
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
        return await this.queryBus.ask(new AppHealthPaginateDatabasesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
