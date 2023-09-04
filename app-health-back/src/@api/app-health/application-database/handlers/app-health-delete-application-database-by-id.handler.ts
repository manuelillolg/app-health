import { AppHealthApplicationDatabaseDto } from '@api/app-health/application-database';
import { AppHealthApplicationDatabase } from '@api/graphql';
import { AppHealthDeleteApplicationDatabaseByIdCommand, AppHealthFindApplicationDatabaseByIdQuery } from '@app/app-health/application-database';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationDatabaseByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationDatabase | AppHealthApplicationDatabaseDto>
    {
        const applicationDatabase = await this.queryBus.ask(new AppHealthFindApplicationDatabaseByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationDatabaseByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return applicationDatabase;
    }
}
