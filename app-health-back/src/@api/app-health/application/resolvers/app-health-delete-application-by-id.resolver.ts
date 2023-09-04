import { AppHealthDeleteApplicationByIdHandler } from '@api/app-health/application';
import { AppHealthApplication } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteApplicationByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationByIdHandler,
    ) {}

    @Mutation('appHealthDeleteApplicationById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplication>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
