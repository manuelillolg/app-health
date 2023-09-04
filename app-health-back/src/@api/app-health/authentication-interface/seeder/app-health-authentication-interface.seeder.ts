import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AppHealthCreateAuthenticationInterfacesCommand } from '@app/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';

@Injectable()
export class AppHealthAuthenticationInterfaceSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateAuthenticationInterfacesCommand(
            appHealthMockAuthenticationInterfaceData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
