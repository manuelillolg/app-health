import { AppHealthFindApplicationDatabaseByIdHandler } from '@api/app-health/application-database';
import { AppHealthApplicationDatabase } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindApplicationDatabaseByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindApplicationDatabaseByIdHandler,
    ) {}

    @Query('appHealthFindApplicationDatabaseById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationDatabase>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
