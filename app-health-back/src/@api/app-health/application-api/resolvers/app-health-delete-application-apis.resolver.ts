import { AppHealthDeleteApplicationApisHandler } from '@api/app-health/application-api';
import { AppHealthApplicationApi } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteApplicationApisResolver
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationApisHandler,
    ) {}

    @Mutation('appHealthDeleteApplicationApis')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationApi[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
