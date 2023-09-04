import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AppHealthCreateCustomersCommand } from '@app/app-health/customer';
import { appHealthMockCustomerData } from '@app/app-health/customer';

@Injectable()
export class AppHealthCustomerSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateCustomersCommand(
            appHealthMockCustomerData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
