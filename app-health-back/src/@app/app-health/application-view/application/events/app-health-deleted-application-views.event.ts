import { AppHealthDeletedApplicationViewEvent } from './app-health-deleted-application-view.event';

export class AppHealthDeletedApplicationViewsEvent
{
    constructor(
        public readonly applicationViews: AppHealthDeletedApplicationViewEvent[],
    ) {}
}
