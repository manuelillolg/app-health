import { AppHealthDeleteAuthorizationInterfaceByIdHandler } from '@api/app-health/authorization-interface';
import { AppHealthAuthorizationInterface } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteAuthorizationInterfaceByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteAuthorizationInterfaceByIdHandler,
    ) {}

    @Mutation('appHealthDeleteAuthorizationInterfaceById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthAuthorizationInterface>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
