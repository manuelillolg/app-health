import { AppHealthCreateApplicationViewHandler } from '@api/app-health/application-view';
import { AppHealthApplicationView, AppHealthCreateApplicationViewInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApplicationViewResolver
{
    constructor(
        private readonly handler: AppHealthCreateApplicationViewHandler,
    ) {}

    @Mutation('appHealthCreateApplicationView')
    async main(
        @Args('payload') payload: AppHealthCreateApplicationViewInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationView>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
