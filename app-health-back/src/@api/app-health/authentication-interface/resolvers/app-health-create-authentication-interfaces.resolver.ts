import { AppHealthCreateAuthenticationInterfacesHandler } from '@api/app-health/authentication-interface';
import { AppHealthCreateAuthenticationInterfaceInput } from '@api/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateAuthenticationInterfacesResolver
{
    constructor(
        private readonly handler: AppHealthCreateAuthenticationInterfacesHandler,
    ) {}

    @Mutation('appHealthCreateAuthenticationInterfaces')
    async main(
        @Args('payload') payload: AppHealthCreateAuthenticationInterfaceInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
