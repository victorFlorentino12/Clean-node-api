export class SingUpController {
  hundle (_httpRequest: any): any {
    console.log(_httpRequest)
    return {
      statusCode: 400,
      body: new Error('Missing param: name')
    }
  }
}
