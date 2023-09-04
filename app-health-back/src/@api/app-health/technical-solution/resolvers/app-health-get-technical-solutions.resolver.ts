import { AppHealthGetTechnicalSolutionsHandler } from '@api/app-health/technical-solution';
import { AppHealthTechnicalSolution } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthGetTechnicalSolutionsResolver
{
    constructor(
        private readonly handler: AppHealthGetTechnicalSolutionsHandler,
    ) {}

    @Query('appHealthGetTechnicalSolutions')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthTechnicalSolution[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
