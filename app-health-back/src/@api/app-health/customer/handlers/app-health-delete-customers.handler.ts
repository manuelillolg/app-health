import { AppHealthCustomerDto } from '@api/app-health/customer';
import { AppHealthCustomer } from '@api/graphql';
import { AppHealthDeleteCustomersCommand, AppHealthGetCustomersQuery } from '@app/app-health/customer';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteCustomersHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthCustomer[] | AppHealthCustomerDto[]>
    {
        const customers = await this.queryBus.ask(new AppHealthGetCustomersQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteCustomersCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return customers;
    }
}
