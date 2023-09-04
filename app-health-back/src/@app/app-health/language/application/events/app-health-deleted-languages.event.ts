import { AppHealthDeletedLanguageEvent } from './app-health-deleted-language.event';

export class AppHealthDeletedLanguagesEvent
{
    constructor(
        public readonly languages: AppHealthDeletedLanguageEvent[],
    ) {}
}
