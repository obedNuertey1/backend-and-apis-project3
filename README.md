# URL Shortener Microservice - User Documentation
### Overview:
- [Introduction](#introduction)
- [User Documentation](#user-documentation)
- [Visit Site](https://obn-url-shortner.onrender.com/)

## Introduction
My URL Shortener Microservice is now available: Easily simplify your lengthy web URLs. Receive a JSON response containing both the original URL and its truncated equivalent with a simple POST call to /api/shorturl. For instance, original_url: 'https://example.com', short_url: 1. Then, go to /api/shorturl/short_url> to be smoothly redirected to the original URL. We also have error handling covered—invalid URLs are recognized and responded to with error: 'invalid url'. Easily streamline your connections.

![image](https://github.com/obedNuertey1/backend-and-apis-project3/assets/101027384/2e401499-0c3b-4c08-b825-daad2809d001)


## User Documentation
* You can POST a URL to /api/shorturl and get a JSON response with original_url and short_url properties. Here's an example: { original_url : 'https://obednuertey1.netlify.app/', short_url : 1}
* When you visit /api/shorturl/<short_url>, you will be redirected to the original URL.
* If you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain { error: 'invalid url' }
