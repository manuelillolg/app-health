import { AppHealthFindTechnicalSolutionHandler } from '@api/app-health/technical-solution';
import { AppHealthTechnicalSolution } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindTechnicalSolutionResolver
{
    constructor(
        private readonly handler: AppHealthFindTechnicalSolutionHandler,
    ) {}

    @Query('appHealthFindTechnicalSolution')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthTechnicalSolution>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
