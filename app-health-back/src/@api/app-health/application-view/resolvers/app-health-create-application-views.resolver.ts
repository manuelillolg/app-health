import { AppHealthCreateApplicationViewsHandler } from '@api/app-health/application-view';
import { AppHealthCreateApplicationViewInput } from '@api/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApplicationViewsResolver
{
    constructor(
        private readonly handler: AppHealthCreateApplicationViewsHandler,
    ) {}

    @Mutation('appHealthCreateApplicationViews')
    async main(
        @Args('payload') payload: AppHealthCreateApplicationViewInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
