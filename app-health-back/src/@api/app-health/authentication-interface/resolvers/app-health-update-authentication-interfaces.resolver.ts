import { AppHealthUpdateAuthenticationInterfacesHandler } from '@api/app-health/authentication-interface';
import { AppHealthAuthenticationInterface, AppHealthUpdateAuthenticationInterfacesInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateAuthenticationInterfacesResolver
{
    constructor(
        private readonly handler: AppHealthUpdateAuthenticationInterfacesHandler,
    ) {}

    @Mutation('appHealthUpdateAuthenticationInterfaces')
    async main(
        @Args('payload') payload: AppHealthUpdateAuthenticationInterfacesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthAuthenticationInterface>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
