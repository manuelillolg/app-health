import { AppHealthGetLanguagesHandler } from '@api/app-health/language';
import { AppHealthLanguage } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthGetLanguagesResolver
{
    constructor(
        private readonly handler: AppHealthGetLanguagesHandler,
    ) {}

    @Query('appHealthGetLanguages')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthLanguage[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
