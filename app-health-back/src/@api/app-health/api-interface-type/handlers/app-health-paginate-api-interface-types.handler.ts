import { Pagination } from '@api/graphql';
import { AppHealthPaginateApiInterfaceTypesQuery } from '@app/app-health/api-interface-type';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthPaginateApiInterfaceTypesHandler
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
        return await this.queryBus.ask(new AppHealthPaginateApiInterfaceTypesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
