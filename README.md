# API Basejump: Timestamp Microservice

## User stories:

1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2. When I visit that shortened URL, it will redirect me to my original link.

### Example usage:
```text
https://tiny-butter.glitch.me/api/shorturl/new/https://www.google.ca
```

### Example output:
```js
{ "original_url":"https://www.google.ca", "code":"4645" }
```

### Usage:
```text
https://tiny-butter.glitch.me/api/shorturl/4645
```

### Will redirect to:
```text
https://www.google.ca 
```
