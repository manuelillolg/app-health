import { AppHealthCreatedApplicationLanguageEvent } from './app-health-created-application-language.event';

export class AppHealthCreatedApplicationLanguagesEvent
{
    constructor(
        public readonly applicationLanguages: AppHealthCreatedApplicationLanguageEvent[],
    ) {}
}
