export class ResponseWrapper {
  response: any;
  content: string;
  contentType: string;
  constructor(response: any) {
    this.response = response;
  }
  setContent(content: string) {
    this.content = content;
  }
  setContentType(contentType: string) {
    this.contentType = contentType;
  }
  doOutput() {
    this.response.writeHeader(200, { "Content-Type": this.contentType });
    this.response.write(this.content);
    this.response.end();
  }
}
