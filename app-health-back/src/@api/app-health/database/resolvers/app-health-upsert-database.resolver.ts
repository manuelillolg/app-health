import { AppHealthUpsertDatabaseHandler } from '@api/app-health/database';
import { AppHealthDatabase, AppHealthUpdateDatabaseByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertDatabaseResolver
{
    constructor(
        private readonly handler: AppHealthUpsertDatabaseHandler,
    ) {}

    @Mutation('appHealthUpsertDatabase')
    async main(
        @Args('payload') payload: AppHealthUpdateDatabaseByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthDatabase>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
