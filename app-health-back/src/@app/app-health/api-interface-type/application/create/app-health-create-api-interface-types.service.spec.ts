/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthCreateApiInterfaceTypesService } from './app-health-create-api-interface-types.service';
import { AppHealthIApiInterfaceTypeRepository } from '../../domain/app-health-api-interface-type.repository';
import { AppHealthMockApiInterfaceTypeRepository } from '../../infrastructure/mock/app-health-mock-api-interface-type.repository';

describe('AppHealthCreateApiInterfaceTypesService', () =>
{
    let service: AppHealthCreateApiInterfaceTypesService;
    let mockRepository: AppHealthMockApiInterfaceTypeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateApiInterfaceTypesService,
                AppHealthMockApiInterfaceTypeRepository,
                {
                    provide : AppHealthIApiInterfaceTypeRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateApiInterfaceTypesService);
        mockRepository = module.get(AppHealthMockApiInterfaceTypeRepository);
    });

    describe('main', () =>
    {
        test('CreateApiInterfaceTypesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create apiInterfaceTypes and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
