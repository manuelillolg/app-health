import { AppHealthGetApplicationDatabasesHandler } from '@api/app-health/application-database';
import { AppHealthApplicationDatabase } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthGetApplicationDatabasesResolver
{
    constructor(
        private readonly handler: AppHealthGetApplicationDatabasesHandler,
    ) {}

    @Query('appHealthGetApplicationDatabases')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationDatabase[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
