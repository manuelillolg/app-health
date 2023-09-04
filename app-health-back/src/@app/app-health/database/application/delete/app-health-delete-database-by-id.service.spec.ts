/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockDatabaseData } from '@app/app-health/database/infrastructure/mock/app-health-mock-database.data';
import { AppHealthDeleteDatabaseByIdService } from './app-health-delete-database-by-id.service';
import { AppHealthDatabaseId } from '../../domain/value-objects';
import { AppHealthIDatabaseRepository } from '../../domain/app-health-database.repository';
import { AppHealthMockDatabaseRepository } from '../../infrastructure/mock/app-health-mock-database.repository';

describe('AppHealthDeleteDatabaseByIdService', () =>
{
    let service: AppHealthDeleteDatabaseByIdService;
    let repository: AppHealthIDatabaseRepository;
    let mockRepository: AppHealthMockDatabaseRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthDeleteDatabaseByIdService,
                AppHealthMockDatabaseRepository,
                {
                    provide : AppHealthIDatabaseRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteDatabaseByIdService);
        repository = module.get(AppHealthIDatabaseRepository);
        mockRepository = module.get(AppHealthMockDatabaseRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteDatabaseByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete database and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new AppHealthDatabaseId(appHealthMockDatabaseData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
