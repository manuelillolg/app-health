import { AppHealthPaginateApplicationViewsHandler } from '@api/app-health/application-view';
import { Pagination } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthPaginateApplicationViewsResolver
{
    constructor(
        private readonly handler: AppHealthPaginateApplicationViewsHandler,
    ) {}

    @Query('appHealthPaginateApplicationViews')
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
