import { AppHealthFindAuthorizationInterfaceByIdHandler } from '@api/app-health/authorization-interface';
import { AppHealthAuthorizationInterface } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindAuthorizationInterfaceByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindAuthorizationInterfaceByIdHandler,
    ) {}

    @Query('appHealthFindAuthorizationInterfaceById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthAuthorizationInterface>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
