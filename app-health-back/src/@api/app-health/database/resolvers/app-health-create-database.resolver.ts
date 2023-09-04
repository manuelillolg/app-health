import { AppHealthCreateDatabaseHandler } from '@api/app-health/database';
import { AppHealthCreateDatabaseInput, AppHealthDatabase } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateDatabaseResolver
{
    constructor(
        private readonly handler: AppHealthCreateDatabaseHandler,
    ) {}

    @Mutation('appHealthCreateDatabase')
    async main(
        @Args('payload') payload: AppHealthCreateDatabaseInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthDatabase>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
