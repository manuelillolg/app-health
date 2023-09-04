import { AppHealthFindApplicationAuthenticationByIdHandler } from '@api/app-health/application-authentication';
import { AppHealthApplicationAuthentication } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindApplicationAuthenticationByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindApplicationAuthenticationByIdHandler,
    ) {}

    @Query('appHealthFindApplicationAuthenticationById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationAuthentication>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
