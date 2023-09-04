import { AppHealthUpdateCustomerByIdHandler } from '@api/app-health/customer';
import { AppHealthCustomer, AppHealthUpdateCustomerByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateCustomerByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateCustomerByIdHandler,
    ) {}

    @Mutation('appHealthUpdateCustomerById')
    async main(
        @Args('payload') payload: AppHealthUpdateCustomerByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthCustomer>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
