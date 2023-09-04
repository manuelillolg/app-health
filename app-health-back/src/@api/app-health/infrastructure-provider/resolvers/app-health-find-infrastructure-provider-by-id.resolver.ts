import { AppHealthFindInfrastructureProviderByIdHandler } from '@api/app-health/infrastructure-provider';
import { AppHealthInfrastructureProvider } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindInfrastructureProviderByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindInfrastructureProviderByIdHandler,
    ) {}

    @Query('appHealthFindInfrastructureProviderById')
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
