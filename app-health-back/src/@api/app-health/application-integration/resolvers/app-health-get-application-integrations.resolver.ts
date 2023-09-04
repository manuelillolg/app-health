import { AppHealthGetApplicationIntegrationsHandler } from '@api/app-health/application-integration';
import { AppHealthApplicationIntegration } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthGetApplicationIntegrationsResolver
{
    constructor(
        private readonly handler: AppHealthGetApplicationIntegrationsHandler,
    ) {}

    @Query('appHealthGetApplicationIntegrations')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationIntegration[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
