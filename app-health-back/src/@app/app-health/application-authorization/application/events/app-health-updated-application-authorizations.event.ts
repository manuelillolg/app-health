import { AppHealthUpdatedApplicationAuthorizationEvent } from './app-health-updated-application-authorization.event';

export class AppHealthUpdatedApplicationAuthorizationsEvent
{
    constructor(
        public readonly applicationAuthorizations: AppHealthUpdatedApplicationAuthorizationEvent[],
    ) {}
}
