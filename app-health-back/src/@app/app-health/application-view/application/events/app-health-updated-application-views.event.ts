import { AppHealthUpdatedApplicationViewEvent } from './app-health-updated-application-view.event';

export class AppHealthUpdatedApplicationViewsEvent
{
    constructor(
        public readonly applicationViews: AppHealthUpdatedApplicationViewEvent[],
    ) {}
}
