import { AppHealthUpsertInfrastructureProviderHandler } from '@api/app-health/infrastructure-provider';
import { AppHealthInfrastructureProvider, AppHealthUpdateInfrastructureProviderByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertInfrastructureProviderResolver
{
    constructor(
        private readonly handler: AppHealthUpsertInfrastructureProviderHandler,
    ) {}

    @Mutation('appHealthUpsertInfrastructureProvider')
    async main(
        @Args('payload') payload: AppHealthUpdateInfrastructureProviderByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthInfrastructureProvider>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
