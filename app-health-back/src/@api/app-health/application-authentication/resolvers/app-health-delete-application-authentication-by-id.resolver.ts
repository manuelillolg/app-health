import { AppHealthDeleteApplicationAuthenticationByIdHandler } from '@api/app-health/application-authentication';
import { AppHealthApplicationAuthentication } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteApplicationAuthenticationByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationAuthenticationByIdHandler,
    ) {}

    @Mutation('appHealthDeleteApplicationAuthenticationById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationAuthentication>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
