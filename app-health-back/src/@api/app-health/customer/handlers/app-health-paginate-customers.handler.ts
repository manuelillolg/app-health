import { Pagination } from '@api/graphql';
import { AppHealthPaginateCustomersQuery } from '@app/app-health/customer';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthPaginateCustomersHandler
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
        return await this.queryBus.ask(new AppHealthPaginateCustomersQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
