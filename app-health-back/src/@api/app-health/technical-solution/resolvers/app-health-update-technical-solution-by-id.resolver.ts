import { AppHealthUpdateTechnicalSolutionByIdHandler } from '@api/app-health/technical-solution';
import { AppHealthTechnicalSolution, AppHealthUpdateTechnicalSolutionByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateTechnicalSolutionByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateTechnicalSolutionByIdHandler,
    ) {}

    @Mutation('appHealthUpdateTechnicalSolutionById')
    async main(
        @Args('payload') payload: AppHealthUpdateTechnicalSolutionByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthTechnicalSolution>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
