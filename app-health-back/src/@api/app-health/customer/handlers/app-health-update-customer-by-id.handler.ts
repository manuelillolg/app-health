import { AppHealthCustomerDto, AppHealthUpdateCustomerByIdDto } from '@api/app-health/customer';
import { AppHealthCustomer, AppHealthUpdateCustomerByIdInput } from '@api/graphql';
import { AppHealthFindCustomerByIdQuery, AppHealthUpdateCustomerByIdCommand } from '@app/app-health/customer';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateCustomerByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateCustomerByIdInput | AppHealthUpdateCustomerByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthCustomer | AppHealthCustomerDto>
    {
        const customer = await this.queryBus.ask(new AppHealthFindCustomerByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, customer);

        await this.commandBus.dispatch(new AppHealthUpdateCustomerByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindCustomerByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
