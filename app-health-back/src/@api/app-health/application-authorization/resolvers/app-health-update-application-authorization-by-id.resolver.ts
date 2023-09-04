import { AppHealthUpdateApplicationAuthorizationByIdHandler } from '@api/app-health/application-authorization';
import { AppHealthApplicationAuthorization, AppHealthUpdateApplicationAuthorizationByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationAuthorizationByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationAuthorizationByIdHandler,
    ) {}

    @Mutation('appHealthUpdateApplicationAuthorizationById')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationAuthorizationByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationAuthorization>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
