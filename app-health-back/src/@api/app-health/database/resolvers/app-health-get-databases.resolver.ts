import { AppHealthGetDatabasesHandler } from '@api/app-health/database';
import { AppHealthDatabase } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthGetDatabasesResolver
{
    constructor(
        private readonly handler: AppHealthGetDatabasesHandler,
    ) {}

    @Query('appHealthGetDatabases')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthDatabase[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
