import { AppHealthDeleteInfrastructureProvidersHandler } from '@api/app-health/infrastructure-provider';
import { AppHealthInfrastructureProvider } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteInfrastructureProvidersResolver
{
    constructor(
        private readonly handler: AppHealthDeleteInfrastructureProvidersHandler,
    ) {}

    @Mutation('appHealthDeleteInfrastructureProviders')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthInfrastructureProvider[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
