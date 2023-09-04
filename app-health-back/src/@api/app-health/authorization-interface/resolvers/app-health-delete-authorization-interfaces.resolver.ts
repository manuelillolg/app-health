import { AppHealthDeleteAuthorizationInterfacesHandler } from '@api/app-health/authorization-interface';
import { AppHealthAuthorizationInterface } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteAuthorizationInterfacesResolver
{
    constructor(
        private readonly handler: AppHealthDeleteAuthorizationInterfacesHandler,
    ) {}

    @Mutation('appHealthDeleteAuthorizationInterfaces')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthAuthorizationInterface[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
