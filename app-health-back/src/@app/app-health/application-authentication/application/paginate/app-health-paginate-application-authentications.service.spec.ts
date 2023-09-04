import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthPaginateApplicationAuthenticationsService } from './app-health-paginate-application-authentications.service';
import { AppHealthIApplicationAuthenticationRepository } from '../../domain/app-health-application-authentication.repository';
import { AppHealthMockApplicationAuthenticationRepository } from '../../infrastructure/mock/app-health-mock-application-authentication.repository';

describe('AppHealthPaginateApplicationAuthenticationsService', () =>
{
    let service: AppHealthPaginateApplicationAuthenticationsService;
    let repository: AppHealthIApplicationAuthenticationRepository;
    let mockRepository: AppHealthMockApplicationAuthenticationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthPaginateApplicationAuthenticationsService,
                AppHealthMockApplicationAuthenticationRepository,
                {
                    provide : AppHealthIApplicationAuthenticationRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthPaginateApplicationAuthenticationsService);
        repository = module.get(AppHealthIApplicationAuthenticationRepository);
        mockRepository = module.get(AppHealthMockApplicationAuthenticationRepository);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationAuthenticationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate applicationAuthentications', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            })));
            expect(await service.main({
                offset: 0,
                limit : 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            });
        });
    });
});
