import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AppHealthCreateApplicationAuthorizationsCommand } from '@app/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';

@Injectable()
export class AppHealthApplicationAuthorizationSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationAuthorizationsCommand(
            appHealthMockApplicationAuthorizationData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
