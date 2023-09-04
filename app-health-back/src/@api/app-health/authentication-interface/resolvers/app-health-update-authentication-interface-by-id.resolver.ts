import { AppHealthUpdateAuthenticationInterfaceByIdHandler } from '@api/app-health/authentication-interface';
import { AppHealthAuthenticationInterface, AppHealthUpdateAuthenticationInterfaceByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateAuthenticationInterfaceByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateAuthenticationInterfaceByIdHandler,
    ) {}

    @Mutation('appHealthUpdateAuthenticationInterfaceById')
    async main(
        @Args('payload') payload: AppHealthUpdateAuthenticationInterfaceByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthAuthenticationInterface>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
