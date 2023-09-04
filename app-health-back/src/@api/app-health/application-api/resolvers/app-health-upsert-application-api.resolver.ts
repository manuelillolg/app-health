import { AppHealthUpsertApplicationApiHandler } from '@api/app-health/application-api';
import { AppHealthApplicationApi, AppHealthUpdateApplicationApiByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertApplicationApiResolver
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationApiHandler,
    ) {}

    @Mutation('appHealthUpsertApplicationApi')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationApiByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationApi>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
