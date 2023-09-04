import { AppHealthUpdateApplicationViewByIdHandler } from '@api/app-health/application-view';
import { AppHealthApplicationView, AppHealthUpdateApplicationViewByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationViewByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationViewByIdHandler,
    ) {}

    @Mutation('appHealthUpdateApplicationViewById')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationViewByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationView>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
