import { AppHealthCreateApplicationApiHandler } from '@api/app-health/application-api';
import { AppHealthApplicationApi, AppHealthCreateApplicationApiInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApplicationApiResolver
{
    constructor(
        private readonly handler: AppHealthCreateApplicationApiHandler,
    ) {}

    @Mutation('appHealthCreateApplicationApi')
    async main(
        @Args('payload') payload: AppHealthCreateApplicationApiInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationApi>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
