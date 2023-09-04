import { AppHealthCreateAuthorizationInterfaceHandler } from '@api/app-health/authorization-interface';
import { AppHealthAuthorizationInterface, AppHealthCreateAuthorizationInterfaceInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateAuthorizationInterfaceResolver
{
    constructor(
        private readonly handler: AppHealthCreateAuthorizationInterfaceHandler,
    ) {}

    @Mutation('appHealthCreateAuthorizationInterface')
    async main(
        @Args('payload') payload: AppHealthCreateAuthorizationInterfaceInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthAuthorizationInterface>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
