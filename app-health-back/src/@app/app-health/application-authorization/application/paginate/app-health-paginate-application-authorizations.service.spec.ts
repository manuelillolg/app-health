import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthPaginateApplicationAuthorizationsService } from './app-health-paginate-application-authorizations.service';
import { AppHealthIApplicationAuthorizationRepository } from '../../domain/app-health-application-authorization.repository';
import { AppHealthMockApplicationAuthorizationRepository } from '../../infrastructure/mock/app-health-mock-application-authorization.repository';

describe('AppHealthPaginateApplicationAuthorizationsService', () =>
{
    let service: AppHealthPaginateApplicationAuthorizationsService;
    let repository: AppHealthIApplicationAuthorizationRepository;
    let mockRepository: AppHealthMockApplicationAuthorizationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthPaginateApplicationAuthorizationsService,
                AppHealthMockApplicationAuthorizationRepository,
                {
                    provide : AppHealthIApplicationAuthorizationRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthPaginateApplicationAuthorizationsService);
        repository = module.get(AppHealthIApplicationAuthorizationRepository);
        mockRepository = module.get(AppHealthMockApplicationAuthorizationRepository);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationAuthorizationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate applicationAuthorizations', async () =>
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
