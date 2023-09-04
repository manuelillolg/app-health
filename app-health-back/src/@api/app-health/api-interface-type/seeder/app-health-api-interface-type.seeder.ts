import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AppHealthCreateApiInterfaceTypesCommand } from '@app/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';

@Injectable()
export class AppHealthApiInterfaceTypeSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApiInterfaceTypesCommand(
            appHealthMockApiInterfaceTypeData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
