import { AppHealthCreateCustomersHandler } from '@api/app-health/customer';
import { AppHealthCreateCustomerInput } from '@api/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateCustomersResolver
{
    constructor(
        private readonly handler: AppHealthCreateCustomersHandler,
    ) {}

    @Mutation('appHealthCreateCustomers')
    async main(
        @Args('payload') payload: AppHealthCreateCustomerInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
