import { AppHealthDeleteInfrastructureProviderByIdHandler } from '@api/app-health/infrastructure-provider';
import { AppHealthInfrastructureProvider } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteInfrastructureProviderByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteInfrastructureProviderByIdHandler,
    ) {}

    @Mutation('appHealthDeleteInfrastructureProviderById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthInfrastructureProvider>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
