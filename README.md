User Endpoints:

Get all users: GET /api/users
Get a specific user: GET /api/users/:id
Create a new user: POST /api/users
Update an existing user: PUT /api/users/:id
Delete a user: DELETE /api/users/:id


Survey Endpoints:

Get all surveys: GET /api/surveys
Get a specific survey: GET /api/surveys/:id
Create a new survey: POST /api/surveys
Update an existing survey: PUT /api/surveys/:id
Delete a survey: DELETE /api/surveys/:id


Question Endpoints:

Get all questions for a survey: GET /api/surveys/:surveyId/questions
Get a specific question: GET /api/questions/:id
Create a new question for a survey: POST /api/surveys/:surveyId/questions
Update an existing question: PUT /api/questions/:id
Delete a question: DELETE /api/questions/:id


Response Endpoints:

Get all responses for a survey: GET /api/surveys/:surveyId/responses
Get a specific response: GET /api/responses/:id
Create a new response for a survey: POST /api/surveys/:surveyId/responses
Update an existing response: PUT /api/responses/:id
Delete a response: DELETE /api/responses/:id