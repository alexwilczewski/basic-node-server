export class RequestWrapper {
  request: any;
  constructor(request: any) {
    this.request = request;
  }
  isPath(pathName: string): boolean {
    return ((this.getPath() === pathName) ? true : false);
  }
  getPath(): string {
    return this.request.url;
  }
}
