import { AppHealthUpsertApplicationIntegrationHandler } from '@api/app-health/application-integration';
import { AppHealthApplicationIntegration, AppHealthUpdateApplicationIntegrationByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertApplicationIntegrationResolver
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationIntegrationHandler,
    ) {}

    @Mutation('appHealthUpsertApplicationIntegration')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationIntegrationByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationIntegration>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
