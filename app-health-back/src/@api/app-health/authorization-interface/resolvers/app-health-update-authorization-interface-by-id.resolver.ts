import { AppHealthUpdateAuthorizationInterfaceByIdHandler } from '@api/app-health/authorization-interface';
import { AppHealthAuthorizationInterface, AppHealthUpdateAuthorizationInterfaceByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateAuthorizationInterfaceByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateAuthorizationInterfaceByIdHandler,
    ) {}

    @Mutation('appHealthUpdateAuthorizationInterfaceById')
    async main(
        @Args('payload') payload: AppHealthUpdateAuthorizationInterfaceByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthAuthorizationInterface>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
