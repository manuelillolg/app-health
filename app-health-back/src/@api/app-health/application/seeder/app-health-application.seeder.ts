import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AppHealthCreateApplicationsCommand } from '@app/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';

@Injectable()
export class AppHealthApplicationSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationsCommand(
            appHealthMockApplicationData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
