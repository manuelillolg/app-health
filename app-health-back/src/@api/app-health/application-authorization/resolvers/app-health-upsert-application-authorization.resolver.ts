import { AppHealthUpsertApplicationAuthorizationHandler } from '@api/app-health/application-authorization';
import { AppHealthApplicationAuthorization, AppHealthUpdateApplicationAuthorizationByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertApplicationAuthorizationResolver
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationAuthorizationHandler,
    ) {}

    @Mutation('appHealthUpsertApplicationAuthorization')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationAuthorizationByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationAuthorization>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
