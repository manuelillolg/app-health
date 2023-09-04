import { AppHealthUpsertApplicationAuthenticationHandler } from '@api/app-health/application-authentication';
import { AppHealthApplicationAuthentication, AppHealthUpdateApplicationAuthenticationByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertApplicationAuthenticationResolver
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationAuthenticationHandler,
    ) {}

    @Mutation('appHealthUpsertApplicationAuthentication')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationAuthenticationByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationAuthentication>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
