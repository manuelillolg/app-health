import { AppHealthPaginateInfrastructureServicesHandler } from '@api/app-health/infrastructure-service';
import { Pagination } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthPaginateInfrastructureServicesResolver
{
    constructor(
        private readonly handler: AppHealthPaginateInfrastructureServicesHandler,
    ) {}

    @Query('appHealthPaginateInfrastructureServices')
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
