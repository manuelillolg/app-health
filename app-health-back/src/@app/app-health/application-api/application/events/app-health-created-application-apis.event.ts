import { AppHealthCreatedApplicationApiEvent } from './app-health-created-application-api.event';

export class AppHealthCreatedApplicationApisEvent
{
    constructor(
        public readonly applicationApis: AppHealthCreatedApplicationApiEvent[],
    ) {}
}
