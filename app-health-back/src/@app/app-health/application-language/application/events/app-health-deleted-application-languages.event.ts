import { AppHealthDeletedApplicationLanguageEvent } from './app-health-deleted-application-language.event';

export class AppHealthDeletedApplicationLanguagesEvent
{
    constructor(
        public readonly applicationLanguages: AppHealthDeletedApplicationLanguageEvent[],
    ) {}
}
