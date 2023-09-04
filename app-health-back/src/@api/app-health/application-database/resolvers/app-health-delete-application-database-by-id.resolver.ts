import { AppHealthDeleteApplicationDatabaseByIdHandler } from '@api/app-health/application-database';
import { AppHealthApplicationDatabase } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteApplicationDatabaseByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationDatabaseByIdHandler,
    ) {}

    @Mutation('appHealthDeleteApplicationDatabaseById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationDatabase>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
