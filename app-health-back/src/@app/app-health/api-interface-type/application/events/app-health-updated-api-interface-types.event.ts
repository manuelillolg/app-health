import { AppHealthUpdatedApiInterfaceTypeEvent } from './app-health-updated-api-interface-type.event';

export class AppHealthUpdatedApiInterfaceTypesEvent
{
    constructor(
        public readonly apiInterfaceTypes: AppHealthUpdatedApiInterfaceTypeEvent[],
    ) {}
}
