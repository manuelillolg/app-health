import { AppHealthPaginateDatabasesHandler } from '@api/app-health/database';
import { Pagination } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthPaginateDatabasesResolver
{
    constructor(
        private readonly handler: AppHealthPaginateDatabasesHandler,
    ) {}

    @Query('appHealthPaginateDatabases')
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
