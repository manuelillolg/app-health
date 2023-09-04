import { AppHealthDeleteApplicationLanguagesHandler } from '@api/app-health/application-language';
import { AppHealthApplicationLanguage } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteApplicationLanguagesResolver
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationLanguagesHandler,
    ) {}

    @Mutation('appHealthDeleteApplicationLanguages')
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
