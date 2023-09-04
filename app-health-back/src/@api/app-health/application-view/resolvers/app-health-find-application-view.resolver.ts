import { AppHealthFindApplicationViewHandler } from '@api/app-health/application-view';
import { AppHealthApplicationView } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindApplicationViewResolver
{
    constructor(
        private readonly handler: AppHealthFindApplicationViewHandler,
    ) {}

    @Query('appHealthFindApplicationView')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationView>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
