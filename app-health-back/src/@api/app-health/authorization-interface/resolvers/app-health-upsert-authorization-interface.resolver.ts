import { AppHealthUpsertAuthorizationInterfaceHandler } from '@api/app-health/authorization-interface';
import { AppHealthAuthorizationInterface, AppHealthUpdateAuthorizationInterfaceByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertAuthorizationInterfaceResolver
{
    constructor(
        private readonly handler: AppHealthUpsertAuthorizationInterfaceHandler,
    ) {}

    @Mutation('appHealthUpsertAuthorizationInterface')
    async main(
        @Args('payload') payload: AppHealthUpdateAuthorizationInterfaceByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthAuthorizationInterface>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
