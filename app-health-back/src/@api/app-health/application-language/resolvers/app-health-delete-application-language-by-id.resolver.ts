import { AppHealthDeleteApplicationLanguageByIdHandler } from '@api/app-health/application-language';
import { AppHealthApplicationLanguage } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteApplicationLanguageByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationLanguageByIdHandler,
    ) {}

    @Mutation('appHealthDeleteApplicationLanguageById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationLanguage>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
