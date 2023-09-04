import { AppHealthCreateLanguageHandler } from '@api/app-health/language';
import { AppHealthCreateLanguageInput, AppHealthLanguage } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateLanguageResolver
{
    constructor(
        private readonly handler: AppHealthCreateLanguageHandler,
    ) {}

    @Mutation('appHealthCreateLanguage')
    async main(
        @Args('payload') payload: AppHealthCreateLanguageInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthLanguage>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
