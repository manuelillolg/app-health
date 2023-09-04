import { AppHealthUpsertTechnicalSolutionHandler } from '@api/app-health/technical-solution';
import { AppHealthTechnicalSolution, AppHealthUpdateTechnicalSolutionByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertTechnicalSolutionResolver
{
    constructor(
        private readonly handler: AppHealthUpsertTechnicalSolutionHandler,
    ) {}

    @Mutation('appHealthUpsertTechnicalSolution')
    async main(
        @Args('payload') payload: AppHealthUpdateTechnicalSolutionByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthTechnicalSolution>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
