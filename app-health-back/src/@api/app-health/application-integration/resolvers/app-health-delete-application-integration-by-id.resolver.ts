import { AppHealthDeleteApplicationIntegrationByIdHandler } from '@api/app-health/application-integration';
import { AppHealthApplicationIntegration } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteApplicationIntegrationByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationIntegrationByIdHandler,
    ) {}

    @Mutation('appHealthDeleteApplicationIntegrationById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationIntegration>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
