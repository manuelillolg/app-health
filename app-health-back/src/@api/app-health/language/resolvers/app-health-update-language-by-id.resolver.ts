import { AppHealthUpdateLanguageByIdHandler } from '@api/app-health/language';
import { AppHealthLanguage, AppHealthUpdateLanguageByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateLanguageByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateLanguageByIdHandler,
    ) {}

    @Mutation('appHealthUpdateLanguageById')
    async main(
        @Args('payload') payload: AppHealthUpdateLanguageByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthLanguage>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
