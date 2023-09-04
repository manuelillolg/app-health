import { AppHealthUpdateApplicationLanguagesHandler } from '@api/app-health/application-language';
import { AppHealthApplicationLanguage, AppHealthUpdateApplicationLanguagesInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationLanguagesResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationLanguagesHandler,
    ) {}

    @Mutation('appHealthUpdateApplicationLanguages')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationLanguagesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationLanguage>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
