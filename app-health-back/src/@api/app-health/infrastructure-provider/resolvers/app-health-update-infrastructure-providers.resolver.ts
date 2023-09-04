import { AppHealthUpdateInfrastructureProvidersHandler } from '@api/app-health/infrastructure-provider';
import { AppHealthInfrastructureProvider, AppHealthUpdateInfrastructureProvidersInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateInfrastructureProvidersResolver
{
    constructor(
        private readonly handler: AppHealthUpdateInfrastructureProvidersHandler,
    ) {}

    @Mutation('appHealthUpdateInfrastructureProviders')
    async main(
        @Args('payload') payload: AppHealthUpdateInfrastructureProvidersInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthInfrastructureProvider>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
