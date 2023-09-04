import { AppHealthCreateApplicationDatabaseDto } from '@api/app-health/application-database';
import { AppHealthCreateApplicationDatabaseInput } from '@api/graphql';
import { AppHealthCreateApplicationDatabasesCommand } from '@app/app-health/application-database';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationDatabasesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationDatabaseInput[] | AppHealthCreateApplicationDatabaseDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationDatabasesCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
