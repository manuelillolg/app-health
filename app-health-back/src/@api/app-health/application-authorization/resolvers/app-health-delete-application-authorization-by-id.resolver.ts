import { AppHealthDeleteApplicationAuthorizationByIdHandler } from '@api/app-health/application-authorization';
import { AppHealthApplicationAuthorization } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteApplicationAuthorizationByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationAuthorizationByIdHandler,
    ) {}

    @Mutation('appHealthDeleteApplicationAuthorizationById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationAuthorization>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
