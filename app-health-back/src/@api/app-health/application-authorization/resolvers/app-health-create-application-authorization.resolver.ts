import { AppHealthCreateApplicationAuthorizationHandler } from '@api/app-health/application-authorization';
import { AppHealthApplicationAuthorization, AppHealthCreateApplicationAuthorizationInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApplicationAuthorizationResolver
{
    constructor(
        private readonly handler: AppHealthCreateApplicationAuthorizationHandler,
    ) {}

    @Mutation('appHealthCreateApplicationAuthorization')
    async main(
        @Args('payload') payload: AppHealthCreateApplicationAuthorizationInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationAuthorization>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
