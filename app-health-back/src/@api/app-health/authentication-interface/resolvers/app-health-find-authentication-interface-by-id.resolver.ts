import { AppHealthFindAuthenticationInterfaceByIdHandler } from '@api/app-health/authentication-interface';
import { AppHealthAuthenticationInterface } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindAuthenticationInterfaceByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindAuthenticationInterfaceByIdHandler,
    ) {}

    @Query('appHealthFindAuthenticationInterfaceById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthAuthenticationInterface>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
