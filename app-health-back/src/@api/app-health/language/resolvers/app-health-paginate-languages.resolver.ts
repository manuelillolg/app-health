import { AppHealthPaginateLanguagesHandler } from '@api/app-health/language';
import { Pagination } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthPaginateLanguagesResolver
{
    constructor(
        private readonly handler: AppHealthPaginateLanguagesHandler,
    ) {}

    @Query('appHealthPaginateLanguages')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
