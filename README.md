# API Basejump: URL Shortener Microservice

##User stories:
1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2. If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
3. When I visit that shortened URL, it will redirect me to my original link.

### Example usage:
```text
https://mtharmen-mini-url.herokuapp.com/new/https://www.google.com
https://mtharmen-mini-url.com/new/https://foo.com:800
```

### Example output:
```js
{ "original_url":"https://www.google.com", "mini_url":"https://mtharmen-mini-url.herokuapp.com/2249" }
```

### Usage:
```text
https://mtharmen-mini-url.herokuapp.com/2249
```

### Will redirect to:
```text
https://www.google.com
```
