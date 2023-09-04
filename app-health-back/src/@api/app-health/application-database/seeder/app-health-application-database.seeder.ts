import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AppHealthCreateApplicationDatabasesCommand } from '@app/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';

@Injectable()
export class AppHealthApplicationDatabaseSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationDatabasesCommand(
            appHealthMockApplicationDatabaseData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
