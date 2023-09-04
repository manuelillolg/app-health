import { AppHealthDeleteApplicationIntegrationsHandler } from '@api/app-health/application-integration';
import { AppHealthApplicationIntegration } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteApplicationIntegrationsResolver
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationIntegrationsHandler,
    ) {}

    @Mutation('appHealthDeleteApplicationIntegrations')
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
