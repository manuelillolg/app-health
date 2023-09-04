import { AppHealthDeletedApplicationApiEvent } from './app-health-deleted-application-api.event';

export class AppHealthDeletedApplicationApisEvent
{
    constructor(
        public readonly applicationApis: AppHealthDeletedApplicationApiEvent[],
    ) {}
}
