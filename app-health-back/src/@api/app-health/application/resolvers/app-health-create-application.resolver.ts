import { AppHealthCreateApplicationHandler } from '@api/app-health/application';
import { AppHealthApplication, AppHealthCreateApplicationInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApplicationResolver
{
    constructor(
        private readonly handler: AppHealthCreateApplicationHandler,
    ) {}

    @Mutation('appHealthCreateApplication')
    async main(
        @Args('payload') payload: AppHealthCreateApplicationInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplication>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
