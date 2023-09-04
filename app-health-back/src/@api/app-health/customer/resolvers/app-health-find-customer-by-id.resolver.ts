import { AppHealthFindCustomerByIdHandler } from '@api/app-health/customer';
import { AppHealthCustomer } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindCustomerByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindCustomerByIdHandler,
    ) {}

    @Query('appHealthFindCustomerById')
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
