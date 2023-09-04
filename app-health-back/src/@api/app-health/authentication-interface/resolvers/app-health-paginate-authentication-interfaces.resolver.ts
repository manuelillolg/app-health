import { AppHealthPaginateAuthenticationInterfacesHandler } from '@api/app-health/authentication-interface';
import { Pagination } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthPaginateAuthenticationInterfacesResolver
{
    constructor(
        private readonly handler: AppHealthPaginateAuthenticationInterfacesHandler,
    ) {}

    @Query('appHealthPaginateAuthenticationInterfaces')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
