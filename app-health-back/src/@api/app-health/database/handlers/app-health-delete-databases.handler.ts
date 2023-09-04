import { AppHealthDatabaseDto } from '@api/app-health/database';
import { AppHealthDatabase } from '@api/graphql';
import { AppHealthDeleteDatabasesCommand, AppHealthGetDatabasesQuery } from '@app/app-health/database';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteDatabasesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthDatabase[] | AppHealthDatabaseDto[]>
    {
        const databases = await this.queryBus.ask(new AppHealthGetDatabasesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteDatabasesCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return databases;
    }
}
