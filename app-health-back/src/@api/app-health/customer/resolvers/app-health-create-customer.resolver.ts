import { AppHealthCreateCustomerHandler } from '@api/app-health/customer';
import { AppHealthCreateCustomerInput, AppHealthCustomer } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateCustomerResolver
{
    constructor(
        private readonly handler: AppHealthCreateCustomerHandler,
    ) {}

    @Mutation('appHealthCreateCustomer')
    async main(
        @Args('payload') payload: AppHealthCreateCustomerInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthCustomer>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
