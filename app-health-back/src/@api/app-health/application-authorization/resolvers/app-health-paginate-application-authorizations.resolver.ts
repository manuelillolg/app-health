import { AppHealthPaginateApplicationAuthorizationsHandler } from '@api/app-health/application-authorization';
import { Pagination } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthPaginateApplicationAuthorizationsResolver
{
    constructor(
        private readonly handler: AppHealthPaginateApplicationAuthorizationsHandler,
    ) {}

    @Query('appHealthPaginateApplicationAuthorizations')
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
