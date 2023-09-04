import { AppHealthDeletedApplicationEvent } from './app-health-deleted-application.event';

export class AppHealthDeletedApplicationsEvent
{
    constructor(
        public readonly applications: AppHealthDeletedApplicationEvent[],
    ) {}
}
