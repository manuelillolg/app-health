import { AppHealthDeleteApplicationDatabasesHandler } from '@api/app-health/application-database';
import { AppHealthApplicationDatabase } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteApplicationDatabasesResolver
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationDatabasesHandler,
    ) {}

    @Mutation('appHealthDeleteApplicationDatabases')
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
