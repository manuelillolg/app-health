import { AppHealthDeleteAuthenticationInterfacesHandler } from '@api/app-health/authentication-interface';
import { AppHealthAuthenticationInterface } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteAuthenticationInterfacesResolver
{
    constructor(
        private readonly handler: AppHealthDeleteAuthenticationInterfacesHandler,
    ) {}

    @Mutation('appHealthDeleteAuthenticationInterfaces')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthAuthenticationInterface[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
