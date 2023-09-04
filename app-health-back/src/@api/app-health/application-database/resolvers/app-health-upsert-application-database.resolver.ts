import { AppHealthUpsertApplicationDatabaseHandler } from '@api/app-health/application-database';
import { AppHealthApplicationDatabase, AppHealthUpdateApplicationDatabaseByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertApplicationDatabaseResolver
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationDatabaseHandler,
    ) {}

    @Mutation('appHealthUpsertApplicationDatabase')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationDatabaseByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationDatabase>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
