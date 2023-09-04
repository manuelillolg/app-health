import { AppHealthDeleteCustomerByIdHandler } from '@api/app-health/customer';
import { AppHealthCustomer } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteCustomerByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteCustomerByIdHandler,
    ) {}

    @Mutation('appHealthDeleteCustomerById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthCustomer>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
