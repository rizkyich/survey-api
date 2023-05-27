participant User
participant Survey
participant Question
participant Response

User -> Survey: CreateSurvey(title, slug, description, userId)
Survey --> User: surveyId

User -> Question: AddQuestion(text, type, options, surveyId)
Question --> User: questionId

User -> Survey: PublishSurvey(surveyId)
Survey --> User: success

User -> Response: SubmitResponse(respondentName, responseValue, surveyId, questionId)
Response --> User: responseId

Response -> Survey: AssociateResponseWithSurvey(responseId, surveyId)
Survey --> Response: success

Response -> Question: AssociateResponseWithQuestion(responseId, questionId)
Question --> Response: success

User -> Survey: GetSurveyResponses(surveyId)
Survey --> User: responses

User -> Question: GetQuestionResponses(questionId)
Question --> User: responses
