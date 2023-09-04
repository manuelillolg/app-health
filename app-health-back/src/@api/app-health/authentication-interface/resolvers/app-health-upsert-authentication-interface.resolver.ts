import { AppHealthUpsertAuthenticationInterfaceHandler } from '@api/app-health/authentication-interface';
import { AppHealthAuthenticationInterface, AppHealthUpdateAuthenticationInterfaceByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertAuthenticationInterfaceResolver
{
    constructor(
        private readonly handler: AppHealthUpsertAuthenticationInterfaceHandler,
    ) {}

    @Mutation('appHealthUpsertAuthenticationInterface')
    async main(
        @Args('payload') payload: AppHealthUpdateAuthenticationInterfaceByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthAuthenticationInterface>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
