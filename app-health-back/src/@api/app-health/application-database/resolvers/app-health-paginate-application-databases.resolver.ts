import { AppHealthPaginateApplicationDatabasesHandler } from '@api/app-health/application-database';
import { Pagination } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthPaginateApplicationDatabasesResolver
{
    constructor(
        private readonly handler: AppHealthPaginateApplicationDatabasesHandler,
    ) {}

    @Query('appHealthPaginateApplicationDatabases')
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
