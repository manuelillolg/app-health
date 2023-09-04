import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AppHealthCreateAuthorizationInterfacesCommand } from '@app/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';

@Injectable()
export class AppHealthAuthorizationInterfaceSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateAuthorizationInterfacesCommand(
            appHealthMockAuthorizationInterfaceData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
