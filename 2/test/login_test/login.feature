Feature: User Login
    Scenario: login with correct credentials
        Given an existing user with the following data:
        | email           | name      | password  |
        | test@example.com | Test User | hashedpassword |
        When I send a POST request to "/login" with:
        | email           | password  |
        | test@example.com | password123 |
        And the response status code should be 200
        and the response should contain:
        """
        {
            name:"Test User",
            email:"test@example.com",
            password:"hashedpassword,
            "sessionId": SessionId
        }
        """
    
    Scenario: fail to login with incorrect credentials
        Given an existing user with the following data:
        | email           | name      | password  |
        | test@example.com | Test User | password123 |
        When I send a POST request to "/login" with:
        | email           | password  |
        | test@example.com | incorrect |
        And the response status code should be 401
        and the response should contain:
        """
        {
            "error": "Invalid password provided."
        }
        """
    
    Scenario: fail to login with non-existent user
        Given no existing user
        When I send a POST request to "/login" with:
        | email           | password  |
        | nonexistent@example.com | password123 |
        And the response status code should be 401
        and the response should contain:
        """
        {
            "error": "User not found with given email."
        }
        """