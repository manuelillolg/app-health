import { AppHealthDeleteApplicationViewsHandler } from '@api/app-health/application-view';
import { AppHealthApplicationView } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteApplicationViewsResolver
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationViewsHandler,
    ) {}

    @Mutation('appHealthDeleteApplicationViews')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationView[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
