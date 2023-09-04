import { AppHealthDeleteTechnicalSolutionByIdHandler } from '@api/app-health/technical-solution';
import { AppHealthTechnicalSolution } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteTechnicalSolutionByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteTechnicalSolutionByIdHandler,
    ) {}

    @Mutation('appHealthDeleteTechnicalSolutionById')
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
