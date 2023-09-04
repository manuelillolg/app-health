import { AppHealthCreateCustomerDto, AppHealthCustomerDto } from '@api/app-health/customer';
import { AppHealthCreateCustomerInput, AppHealthCustomer } from '@api/graphql';
import { AppHealthCreateCustomerCommand, AppHealthFindCustomerByIdQuery } from '@app/app-health/customer';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateCustomerHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateCustomerInput | AppHealthCreateCustomerDto,
        timezone?: string,
    ): Promise<AppHealthCustomer | AppHealthCustomerDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateCustomerCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindCustomerByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
