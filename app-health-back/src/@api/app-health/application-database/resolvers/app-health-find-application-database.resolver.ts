import { AppHealthFindApplicationDatabaseHandler } from '@api/app-health/application-database';
import { AppHealthApplicationDatabase } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindApplicationDatabaseResolver
{
    constructor(
        private readonly handler: AppHealthFindApplicationDatabaseHandler,
    ) {}

    @Query('appHealthFindApplicationDatabase')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationDatabase>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
