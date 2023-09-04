import { AppHealthUpdateApplicationApiByIdHandler } from '@api/app-health/application-api';
import { AppHealthApplicationApi, AppHealthUpdateApplicationApiByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationApiByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationApiByIdHandler,
    ) {}

    @Mutation('appHealthUpdateApplicationApiById')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationApiByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationApi>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
