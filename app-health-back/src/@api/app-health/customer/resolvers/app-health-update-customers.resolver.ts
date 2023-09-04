import { AppHealthUpdateCustomersHandler } from '@api/app-health/customer';
import { AppHealthCustomer, AppHealthUpdateCustomersInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateCustomersResolver
{
    constructor(
        private readonly handler: AppHealthUpdateCustomersHandler,
    ) {}

    @Mutation('appHealthUpdateCustomers')
    async main(
        @Args('payload') payload: AppHealthUpdateCustomersInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthCustomer>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
