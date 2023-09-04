import { AppHealthDeleteDatabaseByIdHandler } from '@api/app-health/database';
import { AppHealthDatabase } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteDatabaseByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteDatabaseByIdHandler,
    ) {}

    @Mutation('appHealthDeleteDatabaseById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthDatabase>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
