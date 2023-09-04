import { AppHealthFindTechnicalSolutionByIdHandler } from '@api/app-health/technical-solution';
import { AppHealthTechnicalSolution } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindTechnicalSolutionByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindTechnicalSolutionByIdHandler,
    ) {}

    @Query('appHealthFindTechnicalSolutionById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthTechnicalSolution>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
