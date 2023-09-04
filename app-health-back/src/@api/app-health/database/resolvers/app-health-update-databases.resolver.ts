import { AppHealthUpdateDatabasesHandler } from '@api/app-health/database';
import { AppHealthDatabase, AppHealthUpdateDatabasesInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateDatabasesResolver
{
    constructor(
        private readonly handler: AppHealthUpdateDatabasesHandler,
    ) {}

    @Mutation('appHealthUpdateDatabases')
    async main(
        @Args('payload') payload: AppHealthUpdateDatabasesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthDatabase>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
