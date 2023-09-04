import { AppHealthUpdateApplicationAuthenticationsHandler } from '@api/app-health/application-authentication';
import { AppHealthApplicationAuthentication, AppHealthUpdateApplicationAuthenticationsInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationAuthenticationsResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationAuthenticationsHandler,
    ) {}

    @Mutation('appHealthUpdateApplicationAuthentications')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationAuthenticationsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationAuthentication>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
