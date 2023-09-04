import { AppHealthUpsertApplicationHandler } from '@api/app-health/application';
import { AppHealthApplication, AppHealthUpdateApplicationByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertApplicationResolver
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationHandler,
    ) {}

    @Mutation('appHealthUpsertApplication')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplication>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
