import { AppHealthUpdateApplicationLanguageByIdHandler } from '@api/app-health/application-language';
import { AppHealthApplicationLanguage, AppHealthUpdateApplicationLanguageByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationLanguageByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationLanguageByIdHandler,
    ) {}

    @Mutation('appHealthUpdateApplicationLanguageById')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationLanguageByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationLanguage>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
