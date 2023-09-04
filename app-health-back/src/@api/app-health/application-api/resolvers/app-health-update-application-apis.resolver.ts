import { AppHealthUpdateApplicationApisHandler } from '@api/app-health/application-api';
import { AppHealthApplicationApi, AppHealthUpdateApplicationApisInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationApisResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationApisHandler,
    ) {}

    @Mutation('appHealthUpdateApplicationApis')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationApisInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationApi>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
