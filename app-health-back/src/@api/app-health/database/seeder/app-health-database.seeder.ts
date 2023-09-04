import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AppHealthCreateDatabasesCommand } from '@app/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';

@Injectable()
export class AppHealthDatabaseSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateDatabasesCommand(
            appHealthMockDatabaseData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
