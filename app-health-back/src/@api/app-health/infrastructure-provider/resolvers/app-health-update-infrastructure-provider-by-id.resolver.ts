import { AppHealthUpdateInfrastructureProviderByIdHandler } from '@api/app-health/infrastructure-provider';
import { AppHealthInfrastructureProvider, AppHealthUpdateInfrastructureProviderByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateInfrastructureProviderByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateInfrastructureProviderByIdHandler,
    ) {}

    @Mutation('appHealthUpdateInfrastructureProviderById')
    async main(
        @Args('payload') payload: AppHealthUpdateInfrastructureProviderByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthInfrastructureProvider>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
