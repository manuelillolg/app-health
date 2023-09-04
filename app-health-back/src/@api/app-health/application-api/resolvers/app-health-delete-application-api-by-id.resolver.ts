import { AppHealthDeleteApplicationApiByIdHandler } from '@api/app-health/application-api';
import { AppHealthApplicationApi } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteApplicationApiByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationApiByIdHandler,
    ) {}

    @Mutation('appHealthDeleteApplicationApiById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationApi>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
