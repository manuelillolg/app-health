import { AppHealthDeleteLanguagesHandler } from '@api/app-health/language';
import { AppHealthLanguage } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteLanguagesResolver
{
    constructor(
        private readonly handler: AppHealthDeleteLanguagesHandler,
    ) {}

    @Mutation('appHealthDeleteLanguages')
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
