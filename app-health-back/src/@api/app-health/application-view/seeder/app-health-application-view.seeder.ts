import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AppHealthCreateApplicationViewsCommand } from '@app/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';

@Injectable()
export class AppHealthApplicationViewSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationViewsCommand(
            appHealthMockApplicationViewData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
