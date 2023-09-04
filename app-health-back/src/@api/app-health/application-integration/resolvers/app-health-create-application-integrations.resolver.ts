import { AppHealthCreateApplicationIntegrationsHandler } from '@api/app-health/application-integration';
import { AppHealthCreateApplicationIntegrationInput } from '@api/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApplicationIntegrationsResolver
{
    constructor(
        private readonly handler: AppHealthCreateApplicationIntegrationsHandler,
    ) {}

    @Mutation('appHealthCreateApplicationIntegrations')
    async main(
        @Args('payload') payload: AppHealthCreateApplicationIntegrationInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
