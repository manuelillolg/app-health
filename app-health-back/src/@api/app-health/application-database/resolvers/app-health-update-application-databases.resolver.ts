import { AppHealthUpdateApplicationDatabasesHandler } from '@api/app-health/application-database';
import { AppHealthApplicationDatabase, AppHealthUpdateApplicationDatabasesInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationDatabasesResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationDatabasesHandler,
    ) {}

    @Mutation('appHealthUpdateApplicationDatabases')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationDatabasesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationDatabase>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
