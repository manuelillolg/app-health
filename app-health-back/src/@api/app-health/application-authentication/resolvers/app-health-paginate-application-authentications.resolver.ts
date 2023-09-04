import { AppHealthPaginateApplicationAuthenticationsHandler } from '@api/app-health/application-authentication';
import { Pagination } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthPaginateApplicationAuthenticationsResolver
{
    constructor(
        private readonly handler: AppHealthPaginateApplicationAuthenticationsHandler,
    ) {}

    @Query('appHealthPaginateApplicationAuthentications')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
