import { AppHealthCreatedApplicationAuthorizationEvent } from './app-health-created-application-authorization.event';

export class AppHealthCreatedApplicationAuthorizationsEvent
{
    constructor(
        public readonly applicationAuthorizations: AppHealthCreatedApplicationAuthorizationEvent[],
    ) {}
}
