import { Pagination } from '@api/graphql';
import { AppHealthPaginateApplicationApisQuery } from '@app/app-health/application-api';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthPaginateApplicationApisHandler
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
        return await this.queryBus.ask(new AppHealthPaginateApplicationApisQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
