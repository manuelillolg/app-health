import { AppHealthUpdatedAuthorizationInterfaceEvent } from './app-health-updated-authorization-interface.event';

export class AppHealthUpdatedAuthorizationInterfacesEvent
{
    constructor(
        public readonly authorizationInterfaces: AppHealthUpdatedAuthorizationInterfaceEvent[],
    ) {}
}
