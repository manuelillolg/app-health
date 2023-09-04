import { AppHealthCreateAuthorizationInterfacesHandler } from '@api/app-health/authorization-interface';
import { AppHealthCreateAuthorizationInterfaceInput } from '@api/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateAuthorizationInterfacesResolver
{
    constructor(
        private readonly handler: AppHealthCreateAuthorizationInterfacesHandler,
    ) {}

    @Mutation('appHealthCreateAuthorizationInterfaces')
    async main(
        @Args('payload') payload: AppHealthCreateAuthorizationInterfaceInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
