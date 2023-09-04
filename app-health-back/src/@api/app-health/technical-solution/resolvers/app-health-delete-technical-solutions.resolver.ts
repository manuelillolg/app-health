import { AppHealthDeleteTechnicalSolutionsHandler } from '@api/app-health/technical-solution';
import { AppHealthTechnicalSolution } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteTechnicalSolutionsResolver
{
    constructor(
        private readonly handler: AppHealthDeleteTechnicalSolutionsHandler,
    ) {}

    @Mutation('appHealthDeleteTechnicalSolutions')
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
