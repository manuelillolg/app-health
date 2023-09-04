import { AppHealthUpdatedApplicationEvent } from './app-health-updated-application.event';

export class AppHealthUpdatedApplicationsEvent
{
    constructor(
        public readonly applications: AppHealthUpdatedApplicationEvent[],
    ) {}
}
