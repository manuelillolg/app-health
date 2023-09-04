import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AppHealthCreateApplicationIntegrationsCommand } from '@app/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';

@Injectable()
export class AppHealthApplicationIntegrationSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationIntegrationsCommand(
            appHealthMockApplicationIntegrationData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
