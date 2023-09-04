import { AppHealthCreatedAuthenticationInterfaceEvent } from './app-health-created-authentication-interface.event';

export class AppHealthCreatedAuthenticationInterfacesEvent
{
    constructor(
        public readonly authenticationInterfaces: AppHealthCreatedAuthenticationInterfaceEvent[],
    ) {}
}
