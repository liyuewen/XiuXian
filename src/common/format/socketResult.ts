export interface SocketResult<T = any> {
  statusCode: number;
  event: string;
  timestamp: string;
  message?: string;
  data?: T;
}

export default class SocketResultFormat<T = any>  {
  constructor(public result: SocketResult<T>) {}

  static result<T>(options: {
    data?: T;
    statusCode?: number;
    message?: string;
    event: string;
  }): SocketResult<T> {
    const result = new SocketResultFormat<T>({
      event: options.event,
      statusCode: options.statusCode || 200,
      timestamp: new Date().toISOString(),
      data: options.data || null,
      message: options.message || '',
    });
    return result.json();
  }

  json() {
    return this.result;
  }
}
