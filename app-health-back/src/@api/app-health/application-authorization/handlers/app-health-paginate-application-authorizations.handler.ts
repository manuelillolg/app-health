import { Pagination } from '@api/graphql';
import { AppHealthPaginateApplicationAuthorizationsQuery } from '@app/app-health/application-authorization';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthPaginateApplicationAuthorizationsHandler
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
        return await this.queryBus.ask(new AppHealthPaginateApplicationAuthorizationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
