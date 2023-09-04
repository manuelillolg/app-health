import { AppHealthApplicationDatabaseDto } from '@api/app-health/application-database';
import { AppHealthApplicationDatabase } from '@api/graphql';
import { AppHealthDeleteApplicationDatabasesCommand, AppHealthGetApplicationDatabasesQuery } from '@app/app-health/application-database';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationDatabasesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationDatabase[] | AppHealthApplicationDatabaseDto[]>
    {
        const applicationDatabases = await this.queryBus.ask(new AppHealthGetApplicationDatabasesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationDatabasesCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return applicationDatabases;
    }
}
