import { AppHealthCreatedApplicationEvent } from './app-health-created-application.event';

export class AppHealthCreatedApplicationsEvent
{
    constructor(
        public readonly applications: AppHealthCreatedApplicationEvent[],
    ) {}
}
