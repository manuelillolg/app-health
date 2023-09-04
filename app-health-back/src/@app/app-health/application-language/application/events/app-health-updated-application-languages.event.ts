import { AppHealthUpdatedApplicationLanguageEvent } from './app-health-updated-application-language.event';

export class AppHealthUpdatedApplicationLanguagesEvent
{
    constructor(
        public readonly applicationLanguages: AppHealthUpdatedApplicationLanguageEvent[],
    ) {}
}
