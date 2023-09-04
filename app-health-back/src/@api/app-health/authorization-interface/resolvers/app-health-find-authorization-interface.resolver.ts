import { AppHealthFindAuthorizationInterfaceHandler } from '@api/app-health/authorization-interface';
import { AppHealthAuthorizationInterface } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindAuthorizationInterfaceResolver
{
    constructor(
        private readonly handler: AppHealthFindAuthorizationInterfaceHandler,
    ) {}

    @Query('appHealthFindAuthorizationInterface')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthAuthorizationInterface>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
