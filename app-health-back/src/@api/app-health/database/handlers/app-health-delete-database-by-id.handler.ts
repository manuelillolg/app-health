import { AppHealthDatabaseDto } from '@api/app-health/database';
import { AppHealthDatabase } from '@api/graphql';
import { AppHealthDeleteDatabaseByIdCommand, AppHealthFindDatabaseByIdQuery } from '@app/app-health/database';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteDatabaseByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthDatabase | AppHealthDatabaseDto>
    {
        const database = await this.queryBus.ask(new AppHealthFindDatabaseByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteDatabaseByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return database;
    }
}
