import { AppHealthGetApplicationViewsHandler } from '@api/app-health/application-view';
import { AppHealthApplicationView } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthGetApplicationViewsResolver
{
    constructor(
        private readonly handler: AppHealthGetApplicationViewsHandler,
    ) {}

    @Query('appHealthGetApplicationViews')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationView[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
