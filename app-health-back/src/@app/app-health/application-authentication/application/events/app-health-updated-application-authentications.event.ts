import { AppHealthUpdatedApplicationAuthenticationEvent } from './app-health-updated-application-authentication.event';

export class AppHealthUpdatedApplicationAuthenticationsEvent
{
    constructor(
        public readonly applicationAuthentications: AppHealthUpdatedApplicationAuthenticationEvent[],
    ) {}
}
