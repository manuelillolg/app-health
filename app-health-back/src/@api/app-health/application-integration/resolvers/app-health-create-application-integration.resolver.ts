import { AppHealthCreateApplicationIntegrationHandler } from '@api/app-health/application-integration';
import { AppHealthApplicationIntegration, AppHealthCreateApplicationIntegrationInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApplicationIntegrationResolver
{
    constructor(
        private readonly handler: AppHealthCreateApplicationIntegrationHandler,
    ) {}

    @Mutation('appHealthCreateApplicationIntegration')
    async main(
        @Args('payload') payload: AppHealthCreateApplicationIntegrationInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationIntegration>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
