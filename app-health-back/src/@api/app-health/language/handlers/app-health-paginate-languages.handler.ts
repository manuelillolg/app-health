import { Pagination } from '@api/graphql';
import { AppHealthPaginateLanguagesQuery } from '@app/app-health/language';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthPaginateLanguagesHandler
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
        return await this.queryBus.ask(new AppHealthPaginateLanguagesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
