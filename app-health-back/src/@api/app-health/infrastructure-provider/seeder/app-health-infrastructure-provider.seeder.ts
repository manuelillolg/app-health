import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AppHealthCreateInfrastructureProvidersCommand } from '@app/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';

@Injectable()
export class AppHealthInfrastructureProviderSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateInfrastructureProvidersCommand(
            appHealthMockInfrastructureProviderData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
