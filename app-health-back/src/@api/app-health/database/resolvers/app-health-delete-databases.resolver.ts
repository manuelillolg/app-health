import { AppHealthDeleteDatabasesHandler } from '@api/app-health/database';
import { AppHealthDatabase } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteDatabasesResolver
{
    constructor(
        private readonly handler: AppHealthDeleteDatabasesHandler,
    ) {}

    @Mutation('appHealthDeleteDatabases')
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
