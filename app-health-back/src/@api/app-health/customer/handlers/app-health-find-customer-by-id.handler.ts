import { AppHealthCustomerDto } from '@api/app-health/customer';
import { AppHealthCustomer } from '@api/graphql';
import { AppHealthFindCustomerByIdQuery } from '@app/app-health/customer';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindCustomerByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthCustomer | AppHealthCustomerDto>
    {
        return await this.queryBus.ask(new AppHealthFindCustomerByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
