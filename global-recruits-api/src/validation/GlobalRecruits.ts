export const GlobalRecruits = {"/mailinglist":{"post":{"security":[],"tags":["mailingList"],"operationId":"JoinMailingList","summary":"Adds User to Mailing List","description":"Adds an Email Address to the MailChimp Mailing List","requestBody":{"required":true,"content":{"application/json":{"schema":{"title":"JoinMailingListRequestBody","type":"object","required":["data"],"properties":{"data":{"type":"object","required":["emailAddress"],"properties":{"emailAddress":{"type":"string","format":"email"}}}}},"examples":{"JoinMailingList":{"value":{"data":{"emailAddress":"contact@globalrecruits.net"}}}}}}},"responses":{"201":{"description":"Successfully Joined Mailing List"},"400":{"description":"A Wide-Spread Validation Error Response","content":{"application/json":{"schema":{"title":"ValidationErrorsResponse","type":"array","minItems":1,"items":{"type":"object","title":"ValidationError","required":["title","detail","pointer"],"properties":{"title":{"type":"string"},"detail":{"type":"string"},"pointer":{"type":"string"}}}},"examples":{"ValidationErrors":{"value":[{"title":"VALIDATION_ERROR","detail":"must have required property 'emailAddress'","pointer":"/data"}]}}}}},"500":{"description":"Join Mailing List MailChimp Error Response","content":{"application/json":{"schema":{"title":"MailChimpErrorResponse","type":"object","required":["title","detail","instance"],"properties":{"title":{"type":"string"},"detail":{"type":"string"},"instance":{"type":"string"}}},"examples":{"MailChimpError":{"value":{"title":"Member Exists","detail":"contact@globalrecruits.net is already a list member. Use PUT to insert or update list members.","instance":"f70b8942-15f6-df09-b7d7-6dcfa5ae3ff7"}}}}}}}}},"/auth":{"post":{"security":[],"tags":["discordAuth"],"operationId":"GetDiscordAccessToken","summary":"Retrieves Discord Access Token","description":"Authentication for Discord - Code Exchange/Refresh Token Renewal","parameters":[{"in":"header","name":"X-Authorization-Code","schema":{"type":"string","example":{"value":"NhhvTDYsFcdgNLnnLijcl7Ku7bEEeee"}}},{"in":"header","name":"X-Refresh-Token","schema":{"type":"string","example":{"value":"D43f5y0ahjqew82jZ4NViEr2YafMKhue"}}},{"in":"query","name":"grantType","required":true,"schema":{"type":"string","enum":["authorization_code","refresh_token"],"example":{"value":"authorization_code"}}}],"responses":{"201":{"description":"Sucessfully Granted a New Access Token","content":{"application/json":{"schema":{"title":"GetDiscordAccessTokenResponse","type":"object","required":["access_token","token_type","expires_in","refresh_token","scope"],"properties":{"access_token":{"type":"string"},"token_type":{"type":"string"},"expires_in":{"type":"number"},"refresh_token":{"type":"string"},"scope":{"type":"string"}}},"examples":{"DiscordAccessToken":{"value":{"access_token":"6qrZcUqja7812RVdnEKjpzOL4CvHBFG","token_type":"Bearer","expires_in":604800,"refresh_token":"D43f5y0ahjqew82jZ4NViEr2YafMKhue","scope":"identify"}}}}}},"400":{"description":"A Wide-Spread Validation Error Response","content":{"application/json":{"schema":{"title":"ValidationErrorsResponse","type":"array","minItems":1,"items":{"type":"object","title":"ValidationError","required":["title","detail","pointer"],"properties":{"title":{"type":"string"},"detail":{"type":"string"},"pointer":{"type":"string"}}}},"examples":{"ValidationErrors":{"value":[{"title":"VALIDATION_ERROR","detail":"must have required property 'emailAddress'","pointer":"/data"}]}}}}},"401":{"description":"Invalid Authorization Code OR Refresh Token Provided"}}}}}