import { AppHealthUpdateTechnicalSolutionsHandler } from '@api/app-health/technical-solution';
import { AppHealthTechnicalSolution, AppHealthUpdateTechnicalSolutionsInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateTechnicalSolutionsResolver
{
    constructor(
        private readonly handler: AppHealthUpdateTechnicalSolutionsHandler,
    ) {}

    @Mutation('appHealthUpdateTechnicalSolutions')
    async main(
        @Args('payload') payload: AppHealthUpdateTechnicalSolutionsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthTechnicalSolution>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
