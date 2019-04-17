import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function mockAuthFactory(
    backend: MockBackend, 
    options: BaseRequestOptions) {
  
  /*
  {
    "userid": "1",
    "username": "Jiayang Liu",
    "admin": true
  }
  */
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIxIiwidXNlcm5hbWUiOiJKaWF5YW5nIExpdSIsImFkbWluIjp0cnVlfQ._miYsP-BZBxED4YkmxSVWIa0uyQ9CMop08D8h7K2oT8';
    
  backend.connections.subscribe((connection: MockConnection) => {
    // We are using the setTimeout() function to simulate an 
    // asynchronous call to the server that takes 1 second. 
    setTimeout(() => {
      //
      // Fake implementation of /api/authenticate
      //
      if (connection.request.url.endsWith('/api/authenticate') &&
        connection.request.method === RequestMethod.Post) {
        let body = JSON.parse(connection.request.getBody());

        if (body.email === 'jiayangliu@virginia.edu' && body.password === 'cs') {
          connection.mockRespond(new Response(
            new ResponseOptions({
              status: 200,
              body: { token: token }
           })));
        } else {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 400 })
          ));
        }
      }



       // 
       // Fake implementation of /api/orders
       //
       if (connection.request.url.endsWith('/api/orders') && 
           connection.request.method === RequestMethod.Get) {
         if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
            connection.mockRespond(new Response(
              new ResponseOptions({ status: 200, body: [1, 2, 3] })
         ));
       } else {
           connection.mockRespond(new Response(
             new ResponseOptions({ status: 401 })
           ));
       }
    }



    }, 1000);   // 1 second
  });

  return new Http(backend, options);
}

export let mockBackendProvider = {
    provide: Http,
    useFactory: mockAuthFactory,
    deps: [MockBackend, BaseRequestOptions]
};