import { AppHealthCreateApplicationAuthenticationHandler } from '@api/app-health/application-authentication';
import { AppHealthApplicationAuthentication, AppHealthCreateApplicationAuthenticationInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApplicationAuthenticationResolver
{
    constructor(
        private readonly handler: AppHealthCreateApplicationAuthenticationHandler,
    ) {}

    @Mutation('appHealthCreateApplicationAuthentication')
    async main(
        @Args('payload') payload: AppHealthCreateApplicationAuthenticationInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationAuthentication>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
