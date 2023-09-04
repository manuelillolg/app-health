import { AppHealthCreateInfrastructureProvidersHandler } from '@api/app-health/infrastructure-provider';
import { AppHealthCreateInfrastructureProviderInput } from '@api/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateInfrastructureProvidersResolver
{
    constructor(
        private readonly handler: AppHealthCreateInfrastructureProvidersHandler,
    ) {}

    @Mutation('appHealthCreateInfrastructureProviders')
    async main(
        @Args('payload') payload: AppHealthCreateInfrastructureProviderInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
