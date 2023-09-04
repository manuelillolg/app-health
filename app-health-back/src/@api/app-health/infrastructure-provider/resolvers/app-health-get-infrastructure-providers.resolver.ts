import { AppHealthGetInfrastructureProvidersHandler } from '@api/app-health/infrastructure-provider';
import { AppHealthInfrastructureProvider } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthGetInfrastructureProvidersResolver
{
    constructor(
        private readonly handler: AppHealthGetInfrastructureProvidersHandler,
    ) {}

    @Query('appHealthGetInfrastructureProviders')
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
