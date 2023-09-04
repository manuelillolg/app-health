import { AppHealthCustomerDto, AppHealthUpdateCustomerByIdDto } from '@api/app-health/customer';
import { AppHealthCustomer, AppHealthUpdateCustomerByIdInput } from '@api/graphql';
import { AppHealthFindCustomerByIdQuery, AppHealthUpsertCustomerCommand } from '@app/app-health/customer';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertCustomerHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateCustomerByIdInput | AppHealthUpdateCustomerByIdDto,
        timezone?: string,
    ): Promise<AppHealthCustomer | AppHealthCustomerDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertCustomerCommand(
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
