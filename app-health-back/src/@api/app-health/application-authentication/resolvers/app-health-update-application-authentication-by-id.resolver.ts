import { AppHealthUpdateApplicationAuthenticationByIdHandler } from '@api/app-health/application-authentication';
import { AppHealthApplicationAuthentication, AppHealthUpdateApplicationAuthenticationByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationAuthenticationByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationAuthenticationByIdHandler,
    ) {}

    @Mutation('appHealthUpdateApplicationAuthenticationById')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationAuthenticationByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationAuthentication>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
