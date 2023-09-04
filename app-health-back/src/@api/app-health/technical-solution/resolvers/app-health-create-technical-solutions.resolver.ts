import { AppHealthCreateTechnicalSolutionsHandler } from '@api/app-health/technical-solution';
import { AppHealthCreateTechnicalSolutionInput } from '@api/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateTechnicalSolutionsResolver
{
    constructor(
        private readonly handler: AppHealthCreateTechnicalSolutionsHandler,
    ) {}

    @Mutation('appHealthCreateTechnicalSolutions')
    async main(
        @Args('payload') payload: AppHealthCreateTechnicalSolutionInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
