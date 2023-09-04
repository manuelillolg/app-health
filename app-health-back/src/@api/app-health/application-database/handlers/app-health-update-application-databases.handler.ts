import { AppHealthApplicationDatabaseDto, AppHealthUpdateApplicationDatabasesDto } from '@api/app-health/application-database';
import { AppHealthApplicationDatabase, AppHealthUpdateApplicationDatabasesInput } from '@api/graphql';
import { AppHealthGetApplicationDatabasesQuery, AppHealthUpdateApplicationDatabasesCommand } from '@app/app-health/application-database';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationDatabasesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationDatabasesInput | AppHealthUpdateApplicationDatabasesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationDatabase | AppHealthApplicationDatabaseDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateApplicationDatabasesCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetApplicationDatabasesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
