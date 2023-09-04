import { AppHealthFindApplicationAuthenticationHandler } from '@api/app-health/application-authentication';
import { AppHealthApplicationAuthentication } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindApplicationAuthenticationResolver
{
    constructor(
        private readonly handler: AppHealthFindApplicationAuthenticationHandler,
    ) {}

    @Query('appHealthFindApplicationAuthentication')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationAuthentication>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
