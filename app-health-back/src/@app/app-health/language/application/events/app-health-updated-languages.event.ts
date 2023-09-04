import { AppHealthUpdatedLanguageEvent } from './app-health-updated-language.event';

export class AppHealthUpdatedLanguagesEvent
{
    constructor(
        public readonly languages: AppHealthUpdatedLanguageEvent[],
    ) {}
}
