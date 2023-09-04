import { AppHealthCreatedLanguageEvent } from './app-health-created-language.event';

export class AppHealthCreatedLanguagesEvent
{
    constructor(
        public readonly languages: AppHealthCreatedLanguageEvent[],
    ) {}
}
