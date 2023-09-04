import { Pagination } from '@api/graphql';
import { AppHealthPaginateApplicationLanguagesQuery } from '@app/app-health/application-language';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthPaginateApplicationLanguagesHandler
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
        return await this.queryBus.ask(new AppHealthPaginateApplicationLanguagesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
