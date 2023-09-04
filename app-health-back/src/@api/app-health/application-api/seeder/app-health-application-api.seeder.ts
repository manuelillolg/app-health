import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AppHealthCreateApplicationApisCommand } from '@app/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';

@Injectable()
export class AppHealthApplicationApiSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationApisCommand(
            appHealthMockApplicationApiData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
