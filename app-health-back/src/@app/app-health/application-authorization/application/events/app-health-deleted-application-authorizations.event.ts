import { AppHealthDeletedApplicationAuthorizationEvent } from './app-health-deleted-application-authorization.event';

export class AppHealthDeletedApplicationAuthorizationsEvent
{
    constructor(
        public readonly applicationAuthorizations: AppHealthDeletedApplicationAuthorizationEvent[],
    ) {}
}
