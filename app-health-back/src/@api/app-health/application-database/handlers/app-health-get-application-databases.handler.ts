import { AppHealthApplicationDatabaseDto } from '@api/app-health/application-database';
import { AppHealthApplicationDatabase } from '@api/graphql';
import { AppHealthGetApplicationDatabasesQuery } from '@app/app-health/application-database';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthGetApplicationDatabasesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationDatabase[] | AppHealthApplicationDatabaseDto[]>
    {
        return await this.queryBus.ask(new AppHealthGetApplicationDatabasesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
