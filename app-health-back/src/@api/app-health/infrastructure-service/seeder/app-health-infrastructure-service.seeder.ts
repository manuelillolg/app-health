import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AppHealthCreateInfrastructureServicesCommand } from '@app/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';

@Injectable()
export class AppHealthInfrastructureServiceSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateInfrastructureServicesCommand(
            appHealthMockInfrastructureServiceData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
