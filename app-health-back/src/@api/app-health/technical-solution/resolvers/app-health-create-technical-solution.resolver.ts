import { AppHealthCreateTechnicalSolutionHandler } from '@api/app-health/technical-solution';
import { AppHealthCreateTechnicalSolutionInput, AppHealthTechnicalSolution } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateTechnicalSolutionResolver
{
    constructor(
        private readonly handler: AppHealthCreateTechnicalSolutionHandler,
    ) {}

    @Mutation('appHealthCreateTechnicalSolution')
    async main(
        @Args('payload') payload: AppHealthCreateTechnicalSolutionInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthTechnicalSolution>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
