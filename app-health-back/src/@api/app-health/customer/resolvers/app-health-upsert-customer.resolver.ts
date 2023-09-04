import { AppHealthUpsertCustomerHandler } from '@api/app-health/customer';
import { AppHealthCustomer, AppHealthUpdateCustomerByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertCustomerResolver
{
    constructor(
        private readonly handler: AppHealthUpsertCustomerHandler,
    ) {}

    @Mutation('appHealthUpsertCustomer')
    async main(
        @Args('payload') payload: AppHealthUpdateCustomerByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthCustomer>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
