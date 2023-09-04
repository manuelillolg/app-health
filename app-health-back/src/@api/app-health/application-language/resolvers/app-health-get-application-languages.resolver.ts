import { AppHealthGetApplicationLanguagesHandler } from '@api/app-health/application-language';
import { AppHealthApplicationLanguage } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthGetApplicationLanguagesResolver
{
    constructor(
        private readonly handler: AppHealthGetApplicationLanguagesHandler,
    ) {}

    @Query('appHealthGetApplicationLanguages')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationLanguage[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
