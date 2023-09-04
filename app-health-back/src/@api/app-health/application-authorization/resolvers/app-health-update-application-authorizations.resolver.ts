import { AppHealthUpdateApplicationAuthorizationsHandler } from '@api/app-health/application-authorization';
import { AppHealthApplicationAuthorization, AppHealthUpdateApplicationAuthorizationsInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationAuthorizationsResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationAuthorizationsHandler,
    ) {}

    @Mutation('appHealthUpdateApplicationAuthorizations')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationAuthorizationsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationAuthorization>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
