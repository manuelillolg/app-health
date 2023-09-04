import { AppHealthPaginateTechnicalSolutionsHandler } from '@api/app-health/technical-solution';
import { Pagination } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthPaginateTechnicalSolutionsResolver
{
    constructor(
        private readonly handler: AppHealthPaginateTechnicalSolutionsHandler,
    ) {}

    @Query('appHealthPaginateTechnicalSolutions')
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
