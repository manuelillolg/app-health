import { AppHealthCreatedApplicationAuthenticationEvent } from './app-health-created-application-authentication.event';

export class AppHealthCreatedApplicationAuthenticationsEvent
{
    constructor(
        public readonly applicationAuthentications: AppHealthCreatedApplicationAuthenticationEvent[],
    ) {}
}
