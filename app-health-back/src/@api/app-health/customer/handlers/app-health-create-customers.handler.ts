import { AppHealthCreateCustomerDto } from '@api/app-health/customer';
import { AppHealthCreateCustomerInput } from '@api/graphql';
import { AppHealthCreateCustomersCommand } from '@app/app-health/customer';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateCustomersHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateCustomerInput[] | AppHealthCreateCustomerDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateCustomersCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
