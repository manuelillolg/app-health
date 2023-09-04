import { AppHealthUpdateApplicationViewsHandler } from '@api/app-health/application-view';
import { AppHealthApplicationView, AppHealthUpdateApplicationViewsInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationViewsResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationViewsHandler,
    ) {}

    @Mutation('appHealthUpdateApplicationViews')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationViewsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationView>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
