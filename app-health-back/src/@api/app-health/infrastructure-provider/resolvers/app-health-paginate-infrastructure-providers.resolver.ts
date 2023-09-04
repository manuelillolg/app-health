import { AppHealthPaginateInfrastructureProvidersHandler } from '@api/app-health/infrastructure-provider';
import { Pagination } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthPaginateInfrastructureProvidersResolver
{
    constructor(
        private readonly handler: AppHealthPaginateInfrastructureProvidersHandler,
    ) {}

    @Query('appHealthPaginateInfrastructureProviders')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
