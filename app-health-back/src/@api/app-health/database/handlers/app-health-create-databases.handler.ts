import { AppHealthCreateDatabaseDto } from '@api/app-health/database';
import { AppHealthCreateDatabaseInput } from '@api/graphql';
import { AppHealthCreateDatabasesCommand } from '@app/app-health/database';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateDatabasesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateDatabaseInput[] | AppHealthCreateDatabaseDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateDatabasesCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
