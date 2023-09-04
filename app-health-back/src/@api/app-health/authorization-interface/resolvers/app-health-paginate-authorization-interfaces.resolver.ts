import { AppHealthPaginateAuthorizationInterfacesHandler } from '@api/app-health/authorization-interface';
import { Pagination } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthPaginateAuthorizationInterfacesResolver
{
    constructor(
        private readonly handler: AppHealthPaginateAuthorizationInterfacesHandler,
    ) {}

    @Query('appHealthPaginateAuthorizationInterfaces')
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
