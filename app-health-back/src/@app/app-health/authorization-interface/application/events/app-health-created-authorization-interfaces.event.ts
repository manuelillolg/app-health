import { AppHealthCreatedAuthorizationInterfaceEvent } from './app-health-created-authorization-interface.event';

export class AppHealthCreatedAuthorizationInterfacesEvent
{
    constructor(
        public readonly authorizationInterfaces: AppHealthCreatedAuthorizationInterfaceEvent[],
    ) {}
}
