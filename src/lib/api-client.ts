import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const DEFAULT_TIMEOUT = 15000;

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

export type ApiClientConfig = {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
  timeoutMs?: number;
  withCredentials?: boolean;
};

export type RequestOptions = {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | null | undefined>;
  signal?: AbortSignal;
};

export class ApiClient {
  private axios: AxiosInstance;

  constructor(config?: ApiClientConfig) {
    const baseURL =
      config?.baseUrl ??
      process.env.NEXT_PUBLIC_API_URL ??
      "http://localhost:3000/api";

    this.axios = axios.create({
      baseURL,
      timeout: config?.timeoutMs ?? DEFAULT_TIMEOUT,
      withCredentials: config?.withCredentials ?? true,
      headers: {
        "Content-Type": "application/json",
        ...(config?.defaultHeaders ?? {}),
      },
    });
  }

  private async request<TResponse, TBody = unknown>(
    method: HttpMethod,
    path: string,
    body?: TBody,
    options?: RequestOptions,
  ): Promise<TResponse> {
    const config: AxiosRequestConfig = {
      method,
      url: path,
      data: body,
      params: options?.query,
      headers: options?.headers,
      signal: options?.signal,
    };

    try {
      const response = await this.axios.request<TResponse>(config);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 0;
        const data = error.response?.data;

        const apiError: ApiError = {
          status,
          message:
            (typeof data === "object" &&
              data !== null &&
              "message" in data &&
              String((data as any).message)) ||
            error.message ||
            "Request failed",
          details: data,
        };

        throw apiError;
      }

      const apiError: ApiError = {
        status: 0,
        message: (error && error.message) || "Unknown request error",
        details: error,
      };

      throw apiError;
    }
  }

  get<TResponse>(path: string, options?: RequestOptions) {
    return this.request<TResponse>("GET", path, undefined, options);
  }

  post<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: RequestOptions,
  ) {
    return this.request<TResponse, TBody>("POST", path, body, options);
  }

  put<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: RequestOptions,
  ) {
    return this.request<TResponse, TBody>("PUT", path, body, options);
  }

  patch<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: RequestOptions,
  ) {
    return this.request<TResponse, TBody>("PATCH", path, body, options);
  }

  delete<TResponse = void>(path: string, options?: RequestOptions) {
    return this.request<TResponse>("DELETE", path, undefined, options);
  }
}

export const apiClient = new ApiClient();
