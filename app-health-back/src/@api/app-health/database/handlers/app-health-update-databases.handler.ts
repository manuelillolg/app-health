import { AppHealthDatabaseDto, AppHealthUpdateDatabasesDto } from '@api/app-health/database';
import { AppHealthDatabase, AppHealthUpdateDatabasesInput } from '@api/graphql';
import { AppHealthGetDatabasesQuery, AppHealthUpdateDatabasesCommand } from '@app/app-health/database';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateDatabasesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateDatabasesInput | AppHealthUpdateDatabasesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthDatabase | AppHealthDatabaseDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateDatabasesCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetDatabasesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
