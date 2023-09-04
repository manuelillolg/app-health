import { AppHealthDeleteApplicationViewByIdHandler } from '@api/app-health/application-view';
import { AppHealthApplicationView } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteApplicationViewByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationViewByIdHandler,
    ) {}

    @Mutation('appHealthDeleteApplicationViewById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationView>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
