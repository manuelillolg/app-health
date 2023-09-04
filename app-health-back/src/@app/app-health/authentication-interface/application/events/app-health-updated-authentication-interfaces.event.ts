import { AppHealthUpdatedAuthenticationInterfaceEvent } from './app-health-updated-authentication-interface.event';

export class AppHealthUpdatedAuthenticationInterfacesEvent
{
    constructor(
        public readonly authenticationInterfaces: AppHealthUpdatedAuthenticationInterfaceEvent[],
    ) {}
}
