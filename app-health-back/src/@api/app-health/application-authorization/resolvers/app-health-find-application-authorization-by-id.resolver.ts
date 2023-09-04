import { AppHealthFindApplicationAuthorizationByIdHandler } from '@api/app-health/application-authorization';
import { AppHealthApplicationAuthorization } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindApplicationAuthorizationByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindApplicationAuthorizationByIdHandler,
    ) {}

    @Query('appHealthFindApplicationAuthorizationById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationAuthorization>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
