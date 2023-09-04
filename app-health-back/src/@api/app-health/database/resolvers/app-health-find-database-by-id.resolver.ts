import { AppHealthFindDatabaseByIdHandler } from '@api/app-health/database';
import { AppHealthDatabase } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindDatabaseByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindDatabaseByIdHandler,
    ) {}

    @Query('appHealthFindDatabaseById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthDatabase>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
