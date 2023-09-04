import { AppHealthCreateApplicationDatabasesHandler } from '@api/app-health/application-database';
import { AppHealthCreateApplicationDatabaseInput } from '@api/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApplicationDatabasesResolver
{
    constructor(
        private readonly handler: AppHealthCreateApplicationDatabasesHandler,
    ) {}

    @Mutation('appHealthCreateApplicationDatabases')
    async main(
        @Args('payload') payload: AppHealthCreateApplicationDatabaseInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
