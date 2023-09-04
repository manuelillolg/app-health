import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AppHealthCreateApplicationAuthenticationsCommand } from '@app/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';

@Injectable()
export class AppHealthApplicationAuthenticationSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationAuthenticationsCommand(
            appHealthMockApplicationAuthenticationData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
