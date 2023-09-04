import { AppHealthCustomerDto, AppHealthUpdateCustomersDto } from '@api/app-health/customer';
import { AppHealthCustomer, AppHealthUpdateCustomersInput } from '@api/graphql';
import { AppHealthGetCustomersQuery, AppHealthUpdateCustomersCommand } from '@app/app-health/customer';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateCustomersHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateCustomersInput | AppHealthUpdateCustomersDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthCustomer | AppHealthCustomerDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateCustomersCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetCustomersQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
