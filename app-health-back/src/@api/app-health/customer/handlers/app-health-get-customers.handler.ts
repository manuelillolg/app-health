import { AppHealthCustomerDto } from '@api/app-health/customer';
import { AppHealthCustomer } from '@api/graphql';
import { AppHealthGetCustomersQuery } from '@app/app-health/customer';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthGetCustomersHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthCustomer[] | AppHealthCustomerDto[]>
    {
        return await this.queryBus.ask(new AppHealthGetCustomersQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
