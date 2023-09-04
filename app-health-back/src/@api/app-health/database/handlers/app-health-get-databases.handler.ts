import { AppHealthDatabaseDto } from '@api/app-health/database';
import { AppHealthDatabase } from '@api/graphql';
import { AppHealthGetDatabasesQuery } from '@app/app-health/database';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthGetDatabasesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthDatabase[] | AppHealthDatabaseDto[]>
    {
        return await this.queryBus.ask(new AppHealthGetDatabasesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
