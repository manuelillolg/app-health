import { AppHealthUpdateAuthorizationInterfacesHandler } from '@api/app-health/authorization-interface';
import { AppHealthAuthorizationInterface, AppHealthUpdateAuthorizationInterfacesInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateAuthorizationInterfacesResolver
{
    constructor(
        private readonly handler: AppHealthUpdateAuthorizationInterfacesHandler,
    ) {}

    @Mutation('appHealthUpdateAuthorizationInterfaces')
    async main(
        @Args('payload') payload: AppHealthUpdateAuthorizationInterfacesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthAuthorizationInterface>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
