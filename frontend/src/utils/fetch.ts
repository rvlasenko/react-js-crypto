export type IDataResponse<T> = IDataResponseSuccess<T> | IDataResponseError

export interface IDataResponseSuccess<T> {
  ok: true
  body: T
}

export interface IDataResponseError {
  ok: false
  message: string
  body?: unknown
}

export const fetchWrapper = async <T>(
  url: string,
  init: RequestInit = {}
): Promise<IDataResponse<T>> => {
  const defaultHeaders = {
    accept: 'application/json',
  }

  const options: RequestInit = {
    headers: {
      ...defaultHeaders,
    },
    ...init,
  }

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      console.error(url, options, response)

      const body = response.body ? ((await response.json()) as T) : undefined

      return {
        ok: false,
        message: 'Unhandled server error',
        body,
      }
    }

    const isJson = response.headers
      .get('Content-Type')
      ?.includes('application/json')

    const successResult: IDataResponseSuccess<T> = {
      ok: true,
      body: isJson ? ((await response.json()) as T) : (response.body as T),
    }

    return successResult
  } catch (error) {
    if (error instanceof TypeError) {
      // Network or fetch error
      return {
        ok: false,
        message: 'Unhandled server error',
        body: {},
      }
    } else {
      // Propagate unknown exception
      throw error
    }
  }
}
