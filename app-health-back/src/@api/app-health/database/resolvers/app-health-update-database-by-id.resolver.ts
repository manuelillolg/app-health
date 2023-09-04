import { AppHealthUpdateDatabaseByIdHandler } from '@api/app-health/database';
import { AppHealthDatabase, AppHealthUpdateDatabaseByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateDatabaseByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateDatabaseByIdHandler,
    ) {}

    @Mutation('appHealthUpdateDatabaseById')
    async main(
        @Args('payload') payload: AppHealthUpdateDatabaseByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthDatabase>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
