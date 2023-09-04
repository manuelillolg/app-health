import { AppHealthUpdateApplicationIntegrationsHandler } from '@api/app-health/application-integration';
import { AppHealthApplicationIntegration, AppHealthUpdateApplicationIntegrationsInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationIntegrationsResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationIntegrationsHandler,
    ) {}

    @Mutation('appHealthUpdateApplicationIntegrations')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationIntegrationsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationIntegration>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
