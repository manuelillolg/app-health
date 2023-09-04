import { AppHealthUpdatedApplicationApiEvent } from './app-health-updated-application-api.event';

export class AppHealthUpdatedApplicationApisEvent
{
    constructor(
        public readonly applicationApis: AppHealthUpdatedApplicationApiEvent[],
    ) {}
}
