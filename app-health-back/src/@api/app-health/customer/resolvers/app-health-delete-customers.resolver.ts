import { AppHealthDeleteCustomersHandler } from '@api/app-health/customer';
import { AppHealthCustomer } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteCustomersResolver
{
    constructor(
        private readonly handler: AppHealthDeleteCustomersHandler,
    ) {}

    @Mutation('appHealthDeleteCustomers')
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
