import { AppHealthCreateDatabasesHandler } from '@api/app-health/database';
import { AppHealthCreateDatabaseInput } from '@api/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateDatabasesResolver
{
    constructor(
        private readonly handler: AppHealthCreateDatabasesHandler,
    ) {}

    @Mutation('appHealthCreateDatabases')
    async main(
        @Args('payload') payload: AppHealthCreateDatabaseInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
