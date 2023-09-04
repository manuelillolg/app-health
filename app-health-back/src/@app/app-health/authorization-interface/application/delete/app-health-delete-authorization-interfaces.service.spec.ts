/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthDeleteAuthorizationInterfacesService } from './app-health-delete-authorization-interfaces.service';
import { AppHealthIAuthorizationInterfaceRepository } from '../../domain/app-health-authorization-interface.repository';
import { AppHealthMockAuthorizationInterfaceRepository } from '../../infrastructure/mock/app-health-mock-authorization-interface.repository';

describe('AppHealthDeleteAuthorizationInterfacesService', () =>
{
    let service: AppHealthDeleteAuthorizationInterfacesService;
    let repository: AppHealthIAuthorizationInterfaceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthDeleteAuthorizationInterfacesService,
                AppHealthMockAuthorizationInterfaceRepository,
                {
                    provide : AppHealthIAuthorizationInterfaceRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteAuthorizationInterfacesService);
        repository = module.get(AppHealthIAuthorizationInterfaceRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteAuthorizationInterfacesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete authorizationInterface and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(
                await service.main(
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
