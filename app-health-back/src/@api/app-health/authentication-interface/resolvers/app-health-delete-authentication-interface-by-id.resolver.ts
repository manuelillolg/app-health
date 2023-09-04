import { AppHealthDeleteAuthenticationInterfaceByIdHandler } from '@api/app-health/authentication-interface';
import { AppHealthAuthenticationInterface } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteAuthenticationInterfaceByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteAuthenticationInterfaceByIdHandler,
    ) {}

    @Mutation('appHealthDeleteAuthenticationInterfaceById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthAuthenticationInterface>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
