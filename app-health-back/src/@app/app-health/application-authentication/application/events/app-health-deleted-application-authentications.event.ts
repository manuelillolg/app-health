import { AppHealthDeletedApplicationAuthenticationEvent } from './app-health-deleted-application-authentication.event';

export class AppHealthDeletedApplicationAuthenticationsEvent
{
    constructor(
        public readonly applicationAuthentications: AppHealthDeletedApplicationAuthenticationEvent[],
    ) {}
}
