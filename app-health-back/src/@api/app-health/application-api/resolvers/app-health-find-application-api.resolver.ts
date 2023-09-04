import { AppHealthFindApplicationApiHandler } from '@api/app-health/application-api';
import { AppHealthApplicationApi } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindApplicationApiResolver
{
    constructor(
        private readonly handler: AppHealthFindApplicationApiHandler,
    ) {}

    @Query('appHealthFindApplicationApi')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationApi>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
