import { AppHealthCustomerDto } from '@api/app-health/customer';
import { AppHealthCustomer } from '@api/graphql';
import { AppHealthDeleteCustomerByIdCommand, AppHealthFindCustomerByIdQuery } from '@app/app-health/customer';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteCustomerByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthCustomer | AppHealthCustomerDto>
    {
        const customer = await this.queryBus.ask(new AppHealthFindCustomerByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteCustomerByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return customer;
    }
}
