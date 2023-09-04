import { AppHealthGetAuthenticationInterfacesHandler } from '@api/app-health/authentication-interface';
import { AppHealthAuthenticationInterface } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthGetAuthenticationInterfacesResolver
{
    constructor(
        private readonly handler: AppHealthGetAuthenticationInterfacesHandler,
    ) {}

    @Query('appHealthGetAuthenticationInterfaces')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthAuthenticationInterface[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
