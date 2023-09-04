import { AppHealthCreateApplicationLanguageHandler } from '@api/app-health/application-language';
import { AppHealthApplicationLanguage, AppHealthCreateApplicationLanguageInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApplicationLanguageResolver
{
    constructor(
        private readonly handler: AppHealthCreateApplicationLanguageHandler,
    ) {}

    @Mutation('appHealthCreateApplicationLanguage')
    async main(
        @Args('payload') payload: AppHealthCreateApplicationLanguageInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationLanguage>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
