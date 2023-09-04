import { Pagination } from '@api/graphql';
import { AppHealthPaginateApplicationAuthenticationsQuery } from '@app/app-health/application-authentication';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthPaginateApplicationAuthenticationsHandler
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
        return await this.queryBus.ask(new AppHealthPaginateApplicationAuthenticationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
