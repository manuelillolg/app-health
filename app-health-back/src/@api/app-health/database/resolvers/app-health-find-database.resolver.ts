import { AppHealthFindDatabaseHandler } from '@api/app-health/database';
import { AppHealthDatabase } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindDatabaseResolver
{
    constructor(
        private readonly handler: AppHealthFindDatabaseHandler,
    ) {}

    @Query('appHealthFindDatabase')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthDatabase>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
