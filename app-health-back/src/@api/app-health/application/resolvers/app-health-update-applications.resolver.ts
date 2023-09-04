import { AppHealthUpdateApplicationsHandler } from '@api/app-health/application';
import { AppHealthApplication, AppHealthUpdateApplicationsInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationsResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationsHandler,
    ) {}

    @Mutation('appHealthUpdateApplications')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplication>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
