import { AppHealthCreateAuthenticationInterfaceHandler } from '@api/app-health/authentication-interface';
import { AppHealthAuthenticationInterface, AppHealthCreateAuthenticationInterfaceInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateAuthenticationInterfaceResolver
{
    constructor(
        private readonly handler: AppHealthCreateAuthenticationInterfaceHandler,
    ) {}

    @Mutation('appHealthCreateAuthenticationInterface')
    async main(
        @Args('payload') payload: AppHealthCreateAuthenticationInterfaceInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthAuthenticationInterface>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
