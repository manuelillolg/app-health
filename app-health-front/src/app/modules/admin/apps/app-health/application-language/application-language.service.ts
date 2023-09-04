import { AppHealthApplication, AppHealthApplicationLanguage, AppHealthCreateApplicationLanguage, AppHealthLanguage, AppHealthUpdateApplicationLanguageById, AppHealthUpdateApplicationLanguages } from '../app-health.types';
import { ApplicationService } from '../application/application.service';
import { LanguageService } from '../language/language.service';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findByIdWithRelationsQuery, findQuery, getQuery, getRelations, paginationQuery, updateByIdMutation, updateMutation } from './application-language.graphql';
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApplicationLanguageService
{
    paginationSubject$: BehaviorSubject<GridData<AppHealthApplicationLanguage> | null> = new BehaviorSubject(null);
    applicationLanguageSubject$: BehaviorSubject<AppHealthApplicationLanguage | null> = new BehaviorSubject(null);
    applicationLanguagesSubject$: BehaviorSubject<AppHealthApplicationLanguage[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly applicationService: ApplicationService,
        private readonly languageService: LanguageService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<AppHealthApplicationLanguage>>
    {
        return this.paginationSubject$.asObservable();
    }

    get applicationLanguage$(): Observable<AppHealthApplicationLanguage>
    {
        return this.applicationLanguageSubject$.asObservable();
    }

    get applicationLanguages$(): Observable<AppHealthApplicationLanguage[]>
    {
        return this.applicationLanguagesSubject$.asObservable();
    }

    pagination(
        {
            graphqlStatement = paginationQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<GridData<AppHealthApplicationLanguage>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<AppHealthApplicationLanguage>; }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data.pagination),
                tap(pagination => this.paginationSubject$.next(pagination)),
            );
    }

    findById(
        {
            graphqlStatement = findByIdQuery,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: AppHealthApplicationLanguage;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplicationLanguage;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationLanguageSubject$.next(data.object);
                }),
            );
    }

    findByIdWithRelations(
        {
            graphqlStatement = findByIdWithRelationsQuery,
            id = '',
            constraint = {},
            headers = {},
            queryApplications = {},
            constraintApplications = {},
            queryLanguages = {},
            constraintLanguages = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            queryApplications?: QueryStatement;
            constraintApplications?: QueryStatement;
            queryLanguages?: QueryStatement;
            constraintLanguages?: QueryStatement;
        } = {},
    ): Observable<{
        object: AppHealthApplicationLanguage;
        appHealthGetApplications: AppHealthApplication[];
        appHealthGetLanguages: AppHealthLanguage[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplicationLanguage;
                appHealthGetApplications: AppHealthApplication[];
                appHealthGetLanguages: AppHealthLanguage[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryApplications,
                    constraintApplications,
                    queryLanguages,
                    constraintLanguages,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationLanguageSubject$.next(data.object);
                    this.applicationService.applicationsSubject$.next(data.appHealthGetApplications);
                    this.languageService.languagesSubject$.next(data.appHealthGetLanguages);
                }),
            );
    }

    find(
        {
            graphqlStatement = findQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: AppHealthApplicationLanguage;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplicationLanguage;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationLanguageSubject$.next(data.object);
                }),
            );
    }

    get(
        {
            graphqlStatement = getQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        objects: AppHealthApplicationLanguage[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: AppHealthApplicationLanguage[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationLanguagesSubject$.next(data.objects);
                }),
            );
    }

    getRelations(
        {
            queryApplications = {},
            constraintApplications = {},
            queryLanguages = {},
            constraintLanguages = {},
            headers = {},
        }: {
            queryApplications?: QueryStatement;
            constraintApplications?: QueryStatement;
            queryLanguages?: QueryStatement;
            constraintLanguages?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        appHealthGetApplications: AppHealthApplication[];
        appHealthGetLanguages: AppHealthLanguage[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                appHealthGetApplications: AppHealthApplication[];
                appHealthGetLanguages: AppHealthLanguage[];
            }>({
                query    : getRelations,
                variables: {
                    queryApplications,
                    constraintApplications,
                    queryLanguages,
                    constraintLanguages,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationService.applicationsSubject$.next(data.appHealthGetApplications);
                    this.languageService.languagesSubject$.next(data.appHealthGetLanguages);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: AppHealthCreateApplicationLanguage;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                },
                context: {
                    headers,
                },
            });
    }

    updateById<T>(
        {
            graphqlStatement = updateByIdMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: AppHealthUpdateApplicationLanguageById;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                },
                context: {
                    headers,
                },
            });
    }

    update<T>(
        {
            graphqlStatement = updateMutation,
            object = null,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: AppHealthUpdateApplicationLanguages;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    deleteById<T>(
        {
            graphqlStatement = deleteByIdMutation,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    id,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    delete<T>(
        {
            graphqlStatement = deleteMutation,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }
}