import { Pagination } from '@api/graphql';
import { AppHealthPaginateAuthenticationInterfacesQuery } from '@app/app-health/authentication-interface';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthPaginateAuthenticationInterfacesHandler
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
        return await this.queryBus.ask(new AppHealthPaginateAuthenticationInterfacesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
