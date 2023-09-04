import { AppHealthFindCustomerHandler } from '@api/app-health/customer';
import { AppHealthCustomer } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindCustomerResolver
{
    constructor(
        private readonly handler: AppHealthFindCustomerHandler,
    ) {}

    @Query('appHealthFindCustomer')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthCustomer>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
