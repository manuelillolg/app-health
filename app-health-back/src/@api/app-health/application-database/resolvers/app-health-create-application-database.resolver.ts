import { AppHealthCreateApplicationDatabaseHandler } from '@api/app-health/application-database';
import { AppHealthApplicationDatabase, AppHealthCreateApplicationDatabaseInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApplicationDatabaseResolver
{
    constructor(
        private readonly handler: AppHealthCreateApplicationDatabaseHandler,
    ) {}

    @Mutation('appHealthCreateApplicationDatabase')
    async main(
        @Args('payload') payload: AppHealthCreateApplicationDatabaseInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationDatabase>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
