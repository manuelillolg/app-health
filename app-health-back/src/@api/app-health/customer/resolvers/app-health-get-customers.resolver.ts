import { AppHealthGetCustomersHandler } from '@api/app-health/customer';
import { AppHealthCustomer } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthGetCustomersResolver
{
    constructor(
        private readonly handler: AppHealthGetCustomersHandler,
    ) {}

    @Query('appHealthGetCustomers')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthCustomer[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
