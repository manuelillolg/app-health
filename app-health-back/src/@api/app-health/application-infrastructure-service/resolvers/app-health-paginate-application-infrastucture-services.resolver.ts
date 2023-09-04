import { AppHealthPaginateApplicationInfrastuctureServicesHandler } from '@api/app-health/application-infrastructure-service';
import { Pagination } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthPaginateApplicationInfrastuctureServicesResolver
{
    constructor(
        private readonly handler: AppHealthPaginateApplicationInfrastuctureServicesHandler,
    ) {}

    @Query('appHealthPaginateApplicationInfrastuctureServices')
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
