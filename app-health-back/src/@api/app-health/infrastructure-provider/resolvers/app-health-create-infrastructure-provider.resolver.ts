import { AppHealthCreateInfrastructureProviderHandler } from '@api/app-health/infrastructure-provider';
import { AppHealthCreateInfrastructureProviderInput, AppHealthInfrastructureProvider } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateInfrastructureProviderResolver
{
    constructor(
        private readonly handler: AppHealthCreateInfrastructureProviderHandler,
    ) {}

    @Mutation('appHealthCreateInfrastructureProvider')
    async main(
        @Args('payload') payload: AppHealthCreateInfrastructureProviderInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthInfrastructureProvider>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
