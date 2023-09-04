import { AppHealthFindApplicationAuthorizationHandler } from '@api/app-health/application-authorization';
import { AppHealthApplicationAuthorization } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindApplicationAuthorizationResolver
{
    constructor(
        private readonly handler: AppHealthFindApplicationAuthorizationHandler,
    ) {}

    @Query('appHealthFindApplicationAuthorization')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationAuthorization>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
