import { AppHealthUpdateApplicationDatabaseByIdHandler } from '@api/app-health/application-database';
import { AppHealthApplicationDatabase, AppHealthUpdateApplicationDatabaseByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationDatabaseByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationDatabaseByIdHandler,
    ) {}

    @Mutation('appHealthUpdateApplicationDatabaseById')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationDatabaseByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationDatabase>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
