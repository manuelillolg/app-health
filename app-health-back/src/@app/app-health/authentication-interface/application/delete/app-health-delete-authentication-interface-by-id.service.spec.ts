/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface/infrastructure/mock/app-health-mock-authentication-interface.data';
import { AppHealthDeleteAuthenticationInterfaceByIdService } from './app-health-delete-authentication-interface-by-id.service';
import { AppHealthAuthenticationInterfaceId } from '../../domain/value-objects';
import { AppHealthIAuthenticationInterfaceRepository } from '../../domain/app-health-authentication-interface.repository';
import { AppHealthMockAuthenticationInterfaceRepository } from '../../infrastructure/mock/app-health-mock-authentication-interface.repository';

describe('AppHealthDeleteAuthenticationInterfaceByIdService', () =>
{
    let service: AppHealthDeleteAuthenticationInterfaceByIdService;
    let repository: AppHealthIAuthenticationInterfaceRepository;
    let mockRepository: AppHealthMockAuthenticationInterfaceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthDeleteAuthenticationInterfaceByIdService,
                AppHealthMockAuthenticationInterfaceRepository,
                {
                    provide : AppHealthIAuthenticationInterfaceRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteAuthenticationInterfaceByIdService);
        repository = module.get(AppHealthIAuthenticationInterfaceRepository);
        mockRepository = module.get(AppHealthMockAuthenticationInterfaceRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteAuthenticationInterfaceByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete authenticationInterface and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new AppHealthAuthenticationInterfaceId(appHealthMockAuthenticationInterfaceData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
