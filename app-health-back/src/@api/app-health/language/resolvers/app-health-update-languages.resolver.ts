import { AppHealthUpdateLanguagesHandler } from '@api/app-health/language';
import { AppHealthLanguage, AppHealthUpdateLanguagesInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateLanguagesResolver
{
    constructor(
        private readonly handler: AppHealthUpdateLanguagesHandler,
    ) {}

    @Mutation('appHealthUpdateLanguages')
    async main(
        @Args('payload') payload: AppHealthUpdateLanguagesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthLanguage>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
