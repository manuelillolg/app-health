import { AppHealthUpsertApplicationViewHandler } from '@api/app-health/application-view';
import { AppHealthApplicationView, AppHealthUpdateApplicationViewByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertApplicationViewResolver
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationViewHandler,
    ) {}

    @Mutation('appHealthUpsertApplicationView')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationViewByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationView>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
