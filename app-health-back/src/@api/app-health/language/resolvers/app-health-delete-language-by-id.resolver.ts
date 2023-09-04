import { AppHealthDeleteLanguageByIdHandler } from '@api/app-health/language';
import { AppHealthLanguage } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteLanguageByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteLanguageByIdHandler,
    ) {}

    @Mutation('appHealthDeleteLanguageById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthLanguage>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
